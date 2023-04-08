import * as React from 'react';
import { Button, Divider, RadioButton } from 'react-native-paper';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const tipOptions = [0.1, 0.15, 0.18, 0.2];

export default function App() {
  const [subtotal, setSubtotal] = React.useState(0);
  const [tipPercent, setTipPercent] = React.useState(0.15);
  const [subtotalInput, setSubtotalInput] = React.useState(subtotal.toFixed(2));

  React.useEffect(() => {
    // update the subtotalInput state when the subtotal state changes
    setSubtotalInput(subtotal.toFixed(2))
  }, [subtotal])

  const calculateTip = () => {
    return subtotal * tipPercent;
  };

  const calculateTotal = () => {
    return subtotal + calculateTip();
  };

  return (
    <View style={styles.container}>
      <Text>Tip Calculator</Text>
        <Button 
          onPress={() => {
            // generate a random subtotal between 0 and 100
            const randomSubtotal = Math.random() * 100
            setSubtotal(randomSubtotal)
          }}
        >
          Generate Random Bill
        </Button>
        <View style={styles.row}>
          <Text>Subtotal: </Text>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            keyboardType='numeric'
            returnKeyType='done'
            value={subtotalInput}
            onChangeText={(text) => {
              // validate input to be only numbers and 2 decimal places
              const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/)
              // only update the input in real time if it's valid since it's bound to the subtotalInput state
              if (validated) {
                setSubtotalInput(text) 
              }
            }}
            onSubmitEditing={() => {
                // handle empty input or just decimal point
                if (subtotalInput === '' || subtotalInput === '.') {
                  setSubtotalInput('0.00')
                  setSubtotal(0)
                  return
                }
                // update the subtotal state with validated input
                setSubtotal(parseFloat(subtotalInput))
            }}
          />
        </View>
        {tipOptions.map((tipOption) => {
          return (
            <RadioButton.Item
              key={tipOption}
              label={`${tipOption * 100}%`}
              value={tipOption}
              status={tipPercent === tipOption ? 'checked' : 'unchecked'}
              onPress={() => setTipPercent(tipOption)}
            />
          ); 
        })}
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>Tip: ${calculateTip().toFixed(2)}</Text>
        <Text>Total: ${calculateTotal().toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
