import React from 'react';
import Barcode from 'react-barcode';
import { Stack, Card, Text } from '@sanity/ui';

function BarcodeInput(props) {
  const { value, renderDefault } = props;

  return (
    <Stack space={3}>
      {value?.barcode && (
        <Card padding={2} radius={2} shadow={1}>
          <Barcode
            value={value.barcode}
            format={value.format || 'CODE128'}
            displayValue={false}
          />
        </Card>
      )}
      {!value?.barcode && value?.format && (
        <Text size={1} muted>
          Enter barcode value below to see preview.
        </Text>
      )}
      {renderDefault(props)}
    </Stack>
  );
}

export default BarcodeInput;
