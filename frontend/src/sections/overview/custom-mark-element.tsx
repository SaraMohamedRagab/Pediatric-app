import React from 'react';
import { MarkElementProps, MarkElement } from '@mui/x-charts';

const CustomMarkElement: React.FC<MarkElementProps> = (props) => {
  const { x, y, color = 'purple', shape = 'star', classes, ...otherProps } = props;

  return (
    <MarkElement
      {...otherProps}
      x={x}
      y={y}
      fill={color}
      color={color}
      stroke="black"
      strokeWidth={4}
      shape={shape}
      classes={classes}
    />
  );
};

export default CustomMarkElement;
