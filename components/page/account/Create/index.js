import React, { useState, useRef } from "react";
import GradientText from "components/GradientText";
import { Input, Form, Spin, message, Upload, Steps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { InboxOutlined } from "@ant-design/icons";
import { PrimaryButton } from "components/button";
import { FormItem, UploadImage, StyledModal, StyledSteps } from "../styled";
import { Properties, Levels, Stats } from "./Components";
import { PinataApi } from "api";
import { useEthers } from "store/useEthers";
import { useWindowDimensions } from "../../../../utils";
import { ethers } from "ethers";

const { Step } = Steps;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Dragger } = Upload;
const { TextArea } = Input;
const INIT_DATA = {
  image: "",
  external_url: "",
  properties: [],
  levels: [],
  stats: [],
};

export default function Create() {
  const [state, setState] = useState(INIT_DATA);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(-1);
  const { device } = useWindowDimensions();

  const [Option, setOption] = useState(null);
  const [form] = Form.useForm();
  const [requiredForm] = Form.useForm();
  const { NFTsContract, Web3Provider, marketContract } = useEthers();

  const UploadProps = {
    name: "file",
    multiple: true,
    action: process.env.NEXT_PUBLIC_PINATA_API + "/pinFileToIPFS",
    headers: {
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_PINATA_TOKEN,
    },
    maxCount: 1,
    onChange(info) {
      UploadImageToIPFS(info);
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove() {
      if (!state.image) return;
      PinataApi.delete(
        "/unpin/" +
          state.image.replace(process.env.NEXT_PUBLIC_PINATA_LOAD_API, "")
      );
    },
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const removeOption = (option, index) => {
    if (IsLoading) return;
    const array = [...state[option]];
    array.splice(index, 1);
    setState({
      ...state,
      [option]: array,
    });
  };

  const addOption = (value) => {
    if (IsLoading) return;
    if (Object.values(value).some((e) => e === "" || e === undefined)) return;
    const array = [...state[Option]];
    array.push(value);
    setState({
      ...state,
      [Option]: array,
    });
    form.resetFields();
    setIsModalVisible(false);
  };

  const submit = async () => {
    if (IsLoading) return;
    const { image } = state;
    const { name, description, external_url } = requiredForm.getFieldsValue();
    let metadataIpfsHash;
    metadataIpfsHash = "QmVmci9j7hY3Gyv5DnjYagPj5UnQ4QikjyvhPNrWavSJJ1";
    // metadataIpfsHash = "QmQ7wLu2TiLaq7VsdwPzgajv3UNGiLh4YFA2NwDsrsPiqW";
    // metadataIpfsHash = "QmQZPM8Jf25Veq3usspaYPCQAJEN1Um6t3EAUY1rewZdLE";
    // metadataIpfsHash = "QmWAXS4VkgEtn9NaTft39AXmQv5wC59id1zGNZD6GcLCwd";

    // try {
    //   if (!(name && description && image)) return setIsInfo("Sorry, you have not filled the required field");
    //   setIsLoading(true);
    //   setStep(0);
    //   const attributes = [...state.properties, ...state.stats, ...state.levels];
    //   const metadata = new Blob(
    //     [
    //       JSON.stringify({
    //         name,
    //         description,
    //         external_url,
    //         image: process.env.NEXT_PUBLIC_PINATA_LOAD_API + image,
    //         attributes,
    //       }),
    //     ],
    //     { type: "application/json" }
    //   );

    //   const fileName = `${account}_${new Date().toISOString()}.json`;
    //   const formData = new FormData();
    //   formData.append("file", metadata, `${fileName}`);
    //   const res = await PinataApi.post("/pinFileToIPFS", formData);
    //   metadataIpfsHash = res.data.IpfsHash;
    // } catch (err) {
    //   console.log(err)
    //   setIsLoading(false);
    //   setStep(-1);
    //   return message.error("Unable to upload JSON file");
    // }

    try {
      const signer = Web3Provider.getSigner();
      const signer_address = await signer.getAddress();
      const NFTsContractWithSigner = NFTsContract.connect(signer);
      const minted = await NFTsContractWithSigner.mint(
        signer_address,
        process.env.NEXT_PUBLIC_PINATA_LOAD_API + metadataIpfsHash
      );
      // -----Mint NFT
      let tokenId;
      const receipt = await minted.wait();
      console.log("receipt minted", receipt);
      for (const event of receipt.events) {
        if (event.event !== "Transfer") {
          continue;
        }
        tokenId = event.args.tokenId;
      }
      if (!tokenId) throw new Error("Unable to mint NFT");

      // ------- Grant authorization for marketplace
      setStep(1);
      await NFTsContractWithSigner.setApprovalForAll(
        process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
        true
      );

      // --------Import NFT to marketplace
      setStep(2);
      const NFTAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
      const imported = await marketContract.importItem(
        NFTAddress,
        signer_address,
        tokenId,
        ethers.utils.parseUnits("1.0")
      );
      const result = await imported.wait();
      console.log("receipt imported", result.events);
      if (!result?.events?.[0])
        throw new Error("Unable to import NFT to marketplace");

      // -------Successfully
      setIsInfo("Great!! Your NFT is created successfully.");
      requiredForm.resetFields();
      setIsLoading(false);
      setStep(-1);
    } catch (err) {
      console.log(err);
      if (isInfo) setIsInfo(false);
      if (
        err.message === "Unable to mint NFT" ||
        err.message === "Unable to upload JSON file" ||
        err.message === "Unable to import NFT to marketplace"
      )
        message.error(err.message);
      else message.error("Failed to create NFT");
      PinataApi.delete("/unpin/" + state.image);
      PinataApi.delete("/unpin/" + metadataIpfsHash, "");
      setIsLoading(false);
      setStep(-1);
    }
  };

  const UploadImageToIPFS = (info) => {
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);

      if (state.image) {
        PinataApi.delete("/unpin/" + state.image);
      }

      info.fileList.forEach((file) => {
        const IpfsHash = file?.response?.IpfsHash;
        if (IpfsHash) {
          setState({
            ...state,
            image: IpfsHash,
          });
        }
      });
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <>
      <div className="container">
        <div className="md:grid md:grid-cols-2">
          <div>
            <div className="rounded-lg bg-dark-blue border-2 border-gray-100 py-10 px-10">
              <div className="text-center">
                <GradientText className="font-semibold text-4xl">
                  NFT
                </GradientText>{" "}
                <span className="text-white font-medium text-2xl">
                  Information
                </span>
              </div>
              <Form layout="vertical" form={requiredForm}>
                <FormItem label="NFT name" name="name" required>
                  <Input />
                </FormItem>
                <FormItem label="Description" name="description" required>
                  <TextArea />
                </FormItem>
                <FormItem label="External Link" name="external_url">
                  <Input />
                </FormItem>
              </Form>

              <div className="flex items-center justify-between mt-6">
                <div>
                  <p className="text-white text-base font-normal">Properties</p>
                  <p className="text-gray text-base font-normal">
                    Textual traits that show up as rectangles
                  </p>
                </div>
                <div
                  className="rounded-lg border-2 font-medium border-secondary h-10 w-10 text-secondary flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (IsLoading) return;
                    setOption("properties");
                    setIsModalVisible(true);
                  }}
                >
                  +
                </div>
              </div>
              <div className="py-3 flex flex-wrap">
                {state.properties.map((e, i) => (
                  <div
                    className="relative border-violet-100 border rounded-lg text-center py-3 px-6 mb-4 mr-4"
                    key={i}
                  >
                    <div
                      className="h-5 w-5 flex items-center justify-center rounded-full bg-red text-white absolute -right-2 -top-2 cursor-pointer"
                      onClick={() => removeOption("properties", i)}
                    >
                      -
                    </div>
                    <GradientText className="">{e.trait_type}</GradientText>
                    <p className="text-white mt-2">{e.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-base font-normal">Levels</p>
                  <p className="text-gray text-base font-normal">
                    Numerical traits that show as a progress bar
                  </p>
                </div>
                <div
                  className="rounded-lg border-2 font-medium border-secondary h-10 w-10 text-secondary flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (IsLoading) return;
                    setOption("levels");
                    setIsModalVisible(true);
                  }}
                >
                  +
                </div>
              </div>
              <div className="py-3 flex flex-wrap">
                {state.levels.map((e, i) => (
                  <div
                    className="relative border-violet-100 border rounded-lg text-center py-3 px-6 mb-4 mr-4"
                    key={i}
                  >
                    <div
                      className="h-5 w-5 flex items-center justify-center rounded-full bg-red text-white absolute -right-2 -top-2 cursor-pointer"
                      onClick={() => removeOption("levels", i)}
                    >
                      -
                    </div>
                    <GradientText className="">{e.trait_type}</GradientText>
                    <p className="text-white mt-2">{e.value}/5</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-base font-normal">Stats</p>
                  <p className="text-gray text-base font-normal">
                    Numerical traits that just show as numbers
                  </p>
                </div>
                <div
                  className="rounded-lg border-2 font-medium border-secondary h-10 w-10 text-secondary flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    if (IsLoading) return;
                    setOption("stats");
                    setIsModalVisible(true);
                  }}
                >
                  +
                </div>
              </div>
              <div className="py-3 flex flex-wrap">
                {state.stats.map((e, i) => (
                  <div
                    className="relative border-violet-100 border rounded-lg text-center py-3 px-6 mb-4 mr-4"
                    key={i}
                  >
                    <div
                      className="h-5 w-5 flex items-center justify-center rounded-full bg-red text-white absolute -right-2 -top-2 cursor-pointer"
                      onClick={() => removeOption("stats", i)}
                    >
                      -
                    </div>
                    <GradientText className="">{e.trait_type}</GradientText>
                    <p className="text-white mt-2">{e.value}/5</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <UploadImage className="mt-10 md:mt-0 md:px-10">
            <Dragger
              {...UploadProps}
              className="max-h-64 bg-transparent hover:border-violet-100 rounded-md"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined className="text-white" />
              </p>
              <p className="ant-upload-text text-white">
                Click or drag file to this area to upload
              </p>
            </Dragger>
            <PrimaryButton
              className="mt-10 w-56 block mx-auto"
              onClick={submit}
            >
              {IsLoading ? (
                <Spin indicator={antIcon} tip="Processing..." />
              ) : (
                "Submit"
              )}
            </PrimaryButton>
            <StyledSteps
              progressDot
              current={step}
              direction={device === "desktop" ? "horizontal" : "vertical"}
            >
              <Step title="Mint NFT" description="Create your NFT" />
              <Step
                title="Grant permission"
                description="To import your NFT to our marketplace, you have to give us control on your NFT. Please click confirm."
              />
              <Step
                title="Import to marketplace"
                description="Please confirm to import your NFT to our marketplace"
              />
            </StyledSteps>
          </UploadImage>
        </div>
      </div>
      <StyledModal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={addOption}
          className="md:grid md:grid-cols-2 md:space-x-4"
        >
          {Option === "stats" ? (
            <Stats />
          ) : Option === "levels" ? (
            <Levels />
          ) : (
            <Properties />
          )}
        </Form>
      </StyledModal>
      <StyledModal
        visible={isInfo}
        onCancel={() => setIsInfo(false)}
        footer={null}
      >
        <p className="text-xl text-white font-medium text-center">{isInfo}</p>
      </StyledModal>
    </>
  );
}
