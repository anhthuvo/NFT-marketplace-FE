import React, { useState, useRef } from "react";
import GradientText from "components/GradientText";
import { Input, Form } from "antd";
import { message, Upload, Badge } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { PrimaryButton } from "components/button";
import { FormItem, UploadImage, StyledModal } from "./styled";
import { Properties, Levels, Stats } from "./Components";
import { PinataApi } from 'api';
import fs from 'fs';
const jsonFile = "./metadata.json";

const { Dragger } = Upload;
const { TextArea } = Input;
const INIT_DATA = {
  name: "",
  description: "",
  external_url: "",
  image: "",
  properties: [],
  levels: [],
  stats: [],
};

export default function Create() {
  const [state, setState] = useState(INIT_DATA);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Option, setOption] = useState(null);
  const value = useRef("");
  const [form] = Form.useForm();

  const UploadProps = {
    name: "file",
    multiple: true,
    action: process.env.NEXT_PUBLIC_PINATA_API + '/pinFileToIPFS',
    headers: {
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_PINATA_TOKEN,
    },
    maxCount: 1,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        if (state.image) {
          PinataApi.delete('/unpin/' + state.image.replace(process.env.NEXT_PUBLIC_PINATA_LOAD_API, ''))
        }

        info.fileList.forEach(file => {
          const IpfsHash = file?.response?.IpfsHash
          if (IpfsHash) {
            setState({
              ...state,
              image: process.env.NEXT_PUBLIC_PINATA_LOAD_API + IpfsHash
            })
          }
        })
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
    onRemove() {
      if (!state.image) return
      PinataApi.delete('/unpin/' + state.image.replace(process.env.NEXT_PUBLIC_PINATA_LOAD_API, ''))
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (_value) => {
    setState({
      ...state,
      ..._value,
    });
  };

  const debounce = (_value, action, time) => {
    value.current = _value;
    setTimeout(() => {
      if (_value === value.current) {
        action(value.current);
      }
    }, time);
  };

  const removeOption = (option, index) => {
    const array = [...state[option]];
    array.splice(index, 1);
    setState({
      ...state,
      [option]: array,
    });
  };

  const addOption = (value) => {
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

  const prepareMetadata = () => {
    const { name, description, external_url, image } = state;
    if ( name && description && external_url && image ) {
      const attributes = [...state.properties, ...state.stats, ...state.levels];
      const metadata = JSON.stringify({
        name,
        description,
        external_url,
        image,
        attributes,
      });

      fs.writeFile(jsonFile, metadata, "utf8", (err, data) => {
        if (err) {
          throw err;
        }
        console.log("Created component file");
      });
      console.log(metadata);
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
              <Form
                layout="vertical"
                onValuesChange={(value) => debounce(value, onChange, 1000)}
              >
                <FormItem label="NFT name" name="name" required>
                  <Input />
                </FormItem>
                <FormItem label="Description" name="description" required>
                  <TextArea />
                </FormItem>
                <FormItem label="External Link" name="external_url" required>
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
                    setOption("properties");
                    setIsModalVisible(true);
                  }}
                >
                  +
                </div>
              </div>
              <div className="px-10 py-3 flex flex-wrap">
                {state.properties.map((e, i) => (
                  <div className="relative border-violet-100 border rounded-lg text-center py-3 px-6 mb-4 mr-4" key={i}>
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
                    setOption("levels");
                    setIsModalVisible(true);
                  }}
                >
                  +
                </div>
              </div>
              <div className="px-10 py-3 flex flex-wrap">
                {state.levels.map((e, i) => (
                  <div className="relative border-violet-100 border rounded-lg text-center py-3 px-6 mb-4 mr-4" key={i}>
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
                    setOption("stats");
                    setIsModalVisible(true);
                  }}
                >
                  +
                </div>
              </div>
              <div className="px-10 py-3 flex flex-wrap">
                {state.stats.map((e, i) => (
                  <div className="relative border-violet-100 border rounded-lg text-center py-3 px-6 mb-4 mr-4" key={i}>
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
            <PrimaryButton className="mt-10 w-56 block mx-auto" onClick={prepareMetadata}>Submit</PrimaryButton>
          </UploadImage>
        </div>
      </div>
      <StyledModal
        title=""
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
    </>
  );
}
