import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { TouchableOpacity } from "react-native-gesture-handler";

const AudioRecord = () => {
  const [recordDetails, setRecordDetails] = useState({
    recordSecond: 0,
    recordTime: "00:00:00"
    // currentPositionSec: 0,
    // currentDurationSec: 0,
    // playTime: '00:00:00',
    // duration: '00:00:00',
  });
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const onStartRecord = async () => {
    console.log("Start Record");
    const path = "hello.m4a";
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac
    };
    const meteringEnabled = false;
    try {
      const result = await audioRecorderPlayer.startRecorder(
        path,
        audioSet,
        meteringEnabled
      );
    } catch (error) {
      console.log("Error", error);
    }
    // this.audioRecorderPlayer.addRecordBackListener(e => {
    //   setRecordDetails({
    //     recordSecs: e.currentPosition,
    //     recordTime: this.audioRecorderPlayer.mmssss(
    //       Math.floor(e.currentPosition)
    //     )
    //   });
    //   this.setState({
    //     recordSecs: e.currentPosition,
    //     recordTime: this.audioRecorderPlayer.mmssss(
    //       Math.floor(e.currentPosition),
    //     ),
    //   });
    //   return;
    // });
    console.log(result);
  };
  return (
    <View>
      <Text>AudioRecord</Text>
      <TouchableOpacity
        style={{ borderWidth: 1, padding: 5, alignItems: "center", margin: 10 }}
        onPress={onStartRecord}
      >
        <Text>Start Record</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AudioRecord;

const styles = StyleSheet.create({});
