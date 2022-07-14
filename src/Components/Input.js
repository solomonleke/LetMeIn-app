import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input as InputBox,
    InputGroup,
    InputRightElement,
    useColorModeValue,
  } from '@chakra-ui/react';
  import React, { useState } from 'react';
  import { FaEye, FaEyeSlash } from 'react-icons/fa';
  
  export default function Input({
    id = '',
    val = false,
    label = '',
    isRequired = false,
    type = 'email',
    readOnly = false,
    helper = null,
    onChange = null,
    isDisabled = false,
    size = 'lg',
    placeholder = `Enter ${label.toLowerCase()}`,
    pl = 0,
    rightIcon = null,
    w = "100%",
    ...rest
  }) {
    const [active, setActive] = useState(rest.value);
    // const [value, setValue] = useState(val);
  
    const [inputType, setInputType] = useState(type);
   
    return (
      <FormControl
        id={id}
        isReadOnly={readOnly}
        isDisabled={isDisabled}
        isRequired={isRequired}
        pos="relative"
      >
        <FormLabel
          pos="absolute"
          transform={`translateY(${active || val ? '-19px' : '7px'}) translateX(15px)`}
          bottom={'3'}
          zIndex="10"
          fontSize={active ? 'xs' : '12px'}
          fontWeight="400"
          color={"#939393"}
          bg={"#fff"}
          px="4px"
        >
          {label}
        </FormLabel>
  
        <InputGroup>
          <InputGroup>
            <InputBox
              // borderColor={Colors.red}
              onChange={onChange}
              {...rest}
              placeholder={active || !label ? placeholder : ''}
              type={inputType}
              focusBorderColor={'#6AF3D8'}
              _focus={{ borderColor: "#6AF3D8" }}
              size={size}
              color="#939393"
              _autofill={{bgColor: "#fff !important"}} 
              fontWeight={'400'}
              fontSize="16px"
              fontFamily={"body"}
              rounded="0px"
              bg="#fff"
              w={w}
              onFocus={() => setActive(true)}
              onBlur={() => {
                if (!rest.value) {
                  setActive(false);
                }
              }}
              // height="56px"
            />
            {rightIcon && <InputRightElement children={rightIcon} />}
          </InputGroup>
          {type === 'password' && (
            <InputRightElement
              children={inputType  === "password" ? <FaEyeSlash color="green.500" /> : <FaEye color="green.500" />}
              cursor={'pointer'}
              onClick={() => {
                if (inputType === 'password') {
                  setInputType('text');
                } else {
                  setInputType('password');
                }
              }}
            />
          )}
        </InputGroup>
        {helper && (
          <FormHelperText pos={'absolute'} p={1} m="0" fontSize={'10px'}>
            {helper}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
  