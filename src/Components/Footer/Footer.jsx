import { Flex, Text } from '@mantine/core';
import React from 'react';

const footerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    textAlign: 'center',
    background: '#007BFF', 
    height: '100px',
    color: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
};

export default function Footer() {
    return (
        <Flex style={footerStyle}>
            <Text size='l' fontWeight={700}>
                &copy; 2023 ToDo
            </Text>
        </Flex>
    );
}
