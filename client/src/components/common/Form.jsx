import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const Form = (formControls) => {
  const renderInputByComponentType = (item) => {
    let element = null;

    switch (item.componentType) {
      case "input":
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
          ></Input>
        );
        break;

      case "select":
        element = (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.placeholder}></SelectValue>
            </SelectTrigger>

            <SelectContent>
              {item.options && item.options.length > 0
                ? item.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={item.name}
            placeholder={item.placeholder}
            id={item.id}
          ></Textarea>
        );
        break;

      default:
        element = (
          <Input
            name={item.name}
            placeholder={item.placeholder}
            id={item.name}
            type={item.type}
          ></Input>
        );
        break;
    }

    return element;
  };

  return (
    <form>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div key={item.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{item.label}</Label>
            {renderInputByComponentType(item)}
          </div>
        ))}
      </div>
    </form>
  );
};

export default Form;
