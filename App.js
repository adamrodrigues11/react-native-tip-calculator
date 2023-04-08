import * as React from 'react';
import { Button, RadioButton } from 'react-native-paper';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

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

  const generateRandomBill = () => {
    // generate a random subtotal between 0 and 100
    const randomSubtotal = Math.random() * 100
    setSubtotal(randomSubtotal)
  }

  const handleSubmitSubtotal = () => {
    // handle empty input or just decimal point
    if (subtotalInput === '' || subtotalInput === '.') {
      setSubtotalInput('0.00')
      setSubtotal(0)
      return
    }
    // update the subtotal state with validated input
    setSubtotal(parseFloat(subtotalInput))
  } 

  const handleChangeSubtotalInput = (text) => {
    // validate input to be only numbers and 2 decimal places
    const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/)
    // only update the input in real time if it's valid since it's bound to the subtotalInput state
    if (validated) {
      setSubtotalInput(text) 
    }
  }

  return (
    <>
    <View style={styles.header}>
      <Text style={styles.title}>Tip Calculator</Text>
    </View>
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Button
        mode='contained'
          style={styles.button}
          labelStyle={{ color: '#fff' }} 
          onPress={generateRandomBill}
        >
          Generate Random Bill
        </Button>
        <View style={styles.row}>
          <Text>Subtotal: </Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            returnKeyType='done'
            value={subtotalInput}
            onChangeText={handleChangeSubtotalInput}
            onSubmitEditing={handleSubmitSubtotal}
          />
        </View>
        <Text>Select a tip percentage:</Text>
        <View
          style={styles.row}
        >
        {tipOptions.map((tipOption) => {
          return (
            <RadioButton.Item
              key={tipOption}
              style={styles.radio}
              label={`${tipOption * 100}%`}
              value={tipOption}
              status={tipPercent === tipOption ? 'checked' : 'unchecked'}
              onPress={() => setTipPercent(tipOption)}
            />
          ); 
        })}
        </View>
        <View style={styles.hr}/>
        <View style={styles.summary}>
          <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
          <Text>Tip: ${calculateTip().toFixed(2)}</Text>
          <Text style={{fontSize: 18}}>Total: ${calculateTotal().toFixed(2)}</Text>
        </View>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#002a8b',
    padding: scale(20),
    paddingTop: scale(40)
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center'
  },
  wrapper: {
    backgroundColor: '#d3ddff',
    color: '#002a8b',
  }, 
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: scale(20),
    height: '100%',
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#002a8b',
  },
  row : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: scale(20),
    flexWrap: 'wrap',
  },
  input: { 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 5, 
    padding: scale(5) 
  },
  radio: {
    border: '1px solid #002a8b',
  },
  hr: {
    width: '100%',
    height: scale(5),
    borderBottomColor: 'black',
    borderBottomWidth: scale(1),
  },
  summary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    rowGap: scale(10),
  }
});
