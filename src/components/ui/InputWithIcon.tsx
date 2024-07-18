import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons';
import CustomInput from './CustomInput';

interface CustomInputWithIconProps {
  icon: IconType;
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  isTextarea?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const CustomInputWithIcon: React.FC<CustomInputWithIconProps> = ({
  icon: Icon,
  register,
  type = 'text',
  placeholder,
  isTextarea = false,
  className,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 bglight p-2">
      <Icon />
      <CustomInput
        register={register}
        type={type}
        placeholder={placeholder}
        isTextarea={isTextarea}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInputWithIcon;
