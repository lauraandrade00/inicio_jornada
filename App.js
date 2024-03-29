import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Image, Alert, TouchableOpacity} from 'react-native'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = ()=>{
  const [toggle,setToggle] = useState(false);

  const handleChangeToggle = ()=> setToggle(oldToggle => !oldToggle);

  useEffect(()=>{
    // Flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(()=>{
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);
    });
    // Essa func vai ser chamando quando o component
    // for desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight: style.container}>
      <TouchableOpacity 
          onPress={() => { 
          setToggle(oldToggle => !oldToggle);
        }}>
        <Image
          style ={toggle ? style.lightingOn : style.lightingOff} 
          source = {
            toggle
              ? require('./assets/icons/lightOn.png')
              : require('./assets/icons/lightOff.png')
            }
          />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  }
});