import React from 'react';
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native';
import * as Permissions from 'expo-permissions' ;
 import {BarCodeScanner} from 'expo-barcode-scanner';







export default class TransactionScreen extends React.Component{
constructor(){
    super();
    this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'

    }
}
getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
        hasCameraPermissions:status==="granted",
        buttonState:'clicked',
        scannned:false,
    
    })
    
    }
    
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
    
        })
    }
    
        render (){
           
            if(buttonState==="clicked" && hasCameraPermissions ){
            
         return(
            <BarCodeScanner
             onBarCodeScanned ={scanned? undefined:this.handleBarCodeScanned}
             style={StyleSheet.absoluteFillObject}
            />
            )
              }
              else if (buttonState==="normal"){
                  return(
                      <View style={styles.container }>
                          <Text style={styles.displayText }>
            {hasCameraPermissions=== true ?this.state.scannedData:"request camera permissions"}
                          </Text>


                          <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
          }}
        />

            <TouchableOpacity 
             onPress={this.getCameraPermissions}
            style={styles.scanButton}>
                <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>


           
                      </View>
                  )
              }
            }
            }
                 
            
            const styles=StyleSheet.create({
               
                displayText:{
                    fontSize:50,
                    textDecorationLine:'underline',
                
                },
                
                buttonText:{
                    fontSize:20,
                
                }
                })