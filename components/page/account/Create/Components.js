import React, { useState, useRef } from "react";
import { Input, Select } from "antd";
import { PrimaryButton } from "components/button";
import { FormItem } from "../styled";

export function Properties() {
  return (
    <>
      <p className="text-gray text-center mb-4 text-lg col-span-2">
        Properties show up underneath your item, are clickable, and can be
        filtered in your collection's sidebar.
      </p>
      <FormItem label="Name" name="trait_type" required>
        <Input />
      </FormItem>
      <FormItem label="Value" name="value" required>
        <Input />
      </FormItem>
      <div className="col-span-2">
        <PrimaryButton htmlType="submit" className="mx-auto block w-40">
          Submit
        </PrimaryButton>
      </div>
    </>
  );
}

export function Levels() {
  return (
    <>
      <p className="text-gray text-center mb-4 text-lg col-span-2">
        Levels show up underneath your item, are clickable, and can be filtered
        in your collection's sidebar.
      </p>
      <FormItem label="Name" name="trait_type" required>
        <Input />
      </FormItem>
      <FormItem label="Value" name="value" required>
        <Select
          placeholder="Out of 5"
        >
          <Select.Option value={0}>0</Select.Option>
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={4}>4</Select.Option>
          <Select.Option value={5}>5</Select.Option>
        </Select>
      </FormItem>
      <div className="col-span-2">
        <PrimaryButton htmlType="submit" className="mx-auto block w-40">
          Submit
        </PrimaryButton>
      </div>
    </>
  );
}

export function Stats() {
  return (
    <>
      <p className="text-gray text-center mb-4 text-lg col-span-2">
        Stats show up underneath your item, are clickable, and can be filtered
        in your collection's sidebar.
      </p>
      <FormItem label="Name" name="trait_type" required>
        <Input />
      </FormItem>
      <FormItem label="Value" name="value" required>
        <Select
          placeholder="Out of 5"
        >
          <Select.Option value={0}>0</Select.Option>
          <Select.Option value={1}>1</Select.Option>
          <Select.Option value={2}>2</Select.Option>
          <Select.Option value={3}>3</Select.Option>
          <Select.Option value={4}>4</Select.Option>
          <Select.Option value={5}>5</Select.Option>
        </Select>
      </FormItem>
      <div className="col-span-2">
        <PrimaryButton htmlType="submit" className="mx-auto block w-40">
          Submit
        </PrimaryButton>
      </div>
    </>
  );
}
