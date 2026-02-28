import React from 'react';
import Barcode from 'react-barcode';
import type { ObjectInputProps } from 'sanity';

export interface BarcodeValue {
  barcode?: string;
  format?: string;
}

function BarcodeInput(props: ObjectInputProps<BarcodeValue>) {
  const { value, renderDefault } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {value?.barcode && (
        <div style={{ padding: 8, borderRadius: 4, boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
          <Barcode
            value={value.barcode}
            format={(value.format as React.ComponentProps<typeof Barcode>['format']) || 'CODE128'}
            displayValue={false}
          />
        </div>
      )}
      {!value?.barcode && value?.format && (
        <span style={{ fontSize: 12, color: '#666' }}>
          Enter barcode value below to see preview.
        </span>
      )}
      {renderDefault(props)}
    </div>
  );
}

export default BarcodeInput;
