import {
  Text,
  View,
  Image,
  ScrollView,
  NativeModules,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Snackbar from 'react-native-snackbar';
import IntentLauncher, {IntentConstant} from 'react-native-intent-launcher';

const { MyTTSModule, MySpeechRecognizer } = NativeModules;

export default function CPR({ navigation }) {
  const route = useRoute();
  const darkMode = route.params?.mode || false; // Ensure darkMode is a boolean
  const [isReading, setIsReading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);
  const tapCounter = useRef(0);

  // Stop any active speech on unmount
  useEffect(() => {
    return () => {
      MyTTSModule.stopSpeech();
    };
  }, []);

  // Shortened content for TTS
const content1 = `चरण 1: आपातकालीन सेवाओं को कॉल करें
यदि आपको कोई व्यक्ति बेहोश मिलता है, जो सांस नहीं ले रहा है, या जिसकी नाड़ी नहीं है और आप कुछ प्रकार की सीपीआर करने का निर्णय लेते हैं, तो आपको अभी भी किसी और काम से पहले तुरंत अपने स्थानीय आपातकालीन नंबर पर कॉल करनी चाहिए। कभी-कभी सीपीआर लोगों को पुनर्जीवित कर सकती है, लेकिन इसे केवल आपातकालीन कर्मियों के आने तक समय खरीदने के रूप में देखा जाना चाहिए। अगर 2 या अधिक लोग उपलब्ध हैं, तो एक व्यक्ति मदद के लिए फोन करे जबकि दूसरा सीपीआर शुरू करे। अगर किसी व्यक्ति की सांस घुटने (उदाहरण के लिए, डूबने) से बेहोश हो जाता है, तो 1 मिनट के लिए तुरंत सीपीआर शुरू करें और फिर अपने स्थानीय आपातकालीन नंबर पर कॉल करें। अगर पीड़ित 1 से 8 वर्ष के बच्चे हैं, तो आपातकालीन सेवाओं को बुलाने से पहले 5 चक्र छाती दबाव और बचाव सांस लें यदि आप अकेले व्यक्ति हैं। इसमें लगभग 2 मिनट लगने चाहिए। आपातकालीन सेवाओं को बुलाने से पैरामेडिक्स को स्थान पर लाया जाएगा। आमतौर पर, डिस्पैचर भी आपको सीपीआर कैसे करें, इस पर निर्देश देने में सक्षम होगा।

चरण 2: वायुमार्ग खोलें
यदि आप सीपीआर में प्रशिक्षित हैं, अपनी क्षमताओं पर विश्वास करते हैं (ज्यादा समय नहीं हुआ है), और आपने 30 छाती दबाव दिए हैं, तो व्यक्ति के वायुमार्ग को खोलने के लिए सिर-झुकाव, ठोड़ी-लिफ्ट तकनीक का उपयोग करें, या यदि आपको गर्दन/सिर/रीढ़ की चोट का संदेह है तो जबड़ा-धक्का तकनीक का उपयोग करें। अपनी हथेली को उनके माथे पर रखें और धीरे से उनके सिर को थोड़ा पीछे की ओर झुकाएं। फिर, अपने दूसरे हाथ से, धीरे से ठोड़ी को आगे उठाएं ताकि उनका वायुमार्ग खुल सके और उन्हें ऑक्सीजन देना आसान हो जाए। 5 से 10 सेकंड तक सामान्य सांस लेने की जांच करें। छाती के हिलने का निरीक्षण करें, सांस सुनें, और देखें कि क्या आप अपनी गाल या कान पर पीड़ित की सांस महसूस कर सकते हैं। ध्यान दें कि हांफना सामान्य सांस नहीं मानी जाती है। अगर वे पहले से ही सांस ले रहे हैं, तो सांस लेने में मदद की जरूरत नहीं है। हालांकि, अगर वे अभी भी सांस नहीं ले रहे हैं, तो सीपीआर के मुँह से मुँह में सांस लेने वाले हिस्से पर जाएं। जबड़ा-धक्का तकनीक का प्रदर्शन करने के लिए, व्यक्ति के सिर के ऊपर बैठें। अपने हाथ को व्यक्ति के जबड़े के दोनों तरफ रखें और जबड़े को उठाएं ताकि यह आगे की ओर झुका हुआ हो, जैसे कि व्यक्ति के पास अंडरबाइट हो।

चरण 3: पीड़ित के मुँह पर अपना मुँह रखें
एक बार जब व्यक्ति का सिर झुका हुआ हो और उसकी ठोड़ी उठी हुई हो, तो सुनिश्चित करें कि उनके मुँह में कोई भी वस्तु वायुमार्ग को अवरुद्ध न कर रही हो। फिर, एक हाथ से पीड़ित की नासिका को बंद करें और उनके मुँह को पूरी तरह से अपने मुँह से ढकें। अपने मुँह से एक सील बनाएं ताकि जब आप पीड़ित को बचाव सांस देने की कोशिश करें तो कोई हवा न निकल सके। आपको यह भी पता होना चाहिए कि मुँह से मुँह सीपीआर के दौरान पीड़ित और बचावकर्ता के बीच संक्रामक वायरल और बैक्टीरियल बीमारियाँ फैल सकती हैं। उनके मुँह से संपर्क करने से पहले, किसी भी उल्टी, बलगम, या अधिक लार को पोंछ लें जो उपस्थित हो सकता है। बचाव सांस भी मुँह से नाक तक हो सकती है यदि व्यक्ति का मुँह गंभीर रूप से घायल हो या नहीं खोला जा सके।
.`;

  const content2 = `चरण 4: 2 बचाव सांसों से शुरू करें
एक बार जब आपका मुँह दूसरे व्यक्ति के मुँह पर हो, तो जोर से कम से कम 1 पूरा सेकंड के लिए उनके मुँह में सांस छोड़ें और देखें कि उनकी छाती थोड़ी उठती है या नहीं। अगर उठती है, तो दूसरी सांस दें। अगर नहीं उठती, तो सिर-झुकाव, ठोड़ी-लिफ्ट प्रक्रिया को दोबारा करें और फिर से प्रयास करें। ज्यादा शर्मीले या घिनौने न हों, क्योंकि आपके हाथों में किसी व्यक्ति का जीवन है। जब आप सांस छोड़ते हैं तब भी आपकी सांस में कार्बन डाइऑक्साइड होता है, फिर भी सीपीआर के दौरान एक पीड़ित को लाभ पहुंचाने के लिए पर्याप्त ऑक्सीजन होती है। फिर से, उद्देश्य हमेशा उन्हें पुनर्जीवित करना या अनिश्चित काल तक जारी रखना नहीं होता, बल्कि पैरामेडिक्स के आने तक उनके लिए समय खरीदना होता है। लगभग 30 छाती दबाव और 2 बचाव सांसें वयस्कों और बच्चों दोनों के लिए 1 चक्र माना जाता है। अगर 1 से 8 वर्ष के बच्चे पर सीपीआर कर रहे हैं, तो उनके फेफड़ों को फुलाने के लिए आप धीरे सांसें दे सकते हैं।

चरण 5: आवश्यकतानुसार चक्रों को दोहराएं
2 बचाव सांसों के बाद 30 छाती दबाव का एक और दौर और 2 और बचाव सांसें दें। तब तक दोहराएं जब तक कि पीड़ित उत्तरदायी न हो जाए या आपातकालीन चिकित्सा कर्मी कार्यभार न संभाल लें। याद रखें कि छाती दबाव कुछ प्रकार का परिसंचरण बहाल करने का प्रयास करते हैं, जबकि बचाव सांसें कुछ (लेकिन ज्यादा नहीं) ऑक्सीजन प्रदान करती हैं ताकि ऊतक, विशेष रूप से मस्तिष्क, मरने से बच सके।
.`;

  // Function to trigger text-to-speech
  async function readOutLoud() {
    setIsReading((prev) => !prev);
    if (!isReading) {
      try {
        await MyTTSModule.speak(content1);
        await MyTTSModule.speak(content2);
      } catch (error) {
        console.error(error);
        Snackbar.show({
          text: 'Error in TTS',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: '#FF4263',
        });
      }
    } else {
      MyTTSModule.stopSpeech();
    }
  }

  // Voice recognition handler
  function handleVoiceRecognition() {
    if (isReading) {
      setIsReading(false);
      MyTTSModule.stopSpeech();
    }

    MySpeechRecognizer.startVoiceRecognition((error, recognizedText) => {
      if (error) {
        Snackbar.show({
          text: "Sorry :( Couldn't hear that",
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: isDarkMode ? '#FF4263' : '#800000',
        });
      } else {
        const lowerCaseText = recognizedText.toString().toLowerCase();
        if (['go back', 'go home'].includes(lowerCaseText)) {
          navigation.goBack();
        } else if (['start', 'speak'].includes(lowerCaseText)) {
          readOutLoud();
        } else {
          Snackbar.show({
            text: "Sorry :( Couldn't decode that",
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: isDarkMode ? '#FF4263' : '#800000',
          });
        }
      }
    });
  }

  // Double tap handler to trigger voice recognition
  function handleDoubleTap() {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (tapCounter.current === 0 || now - tapCounter.current > DOUBLE_PRESS_DELAY) {
      tapCounter.current = now;
    } else {
      tapCounter.current = 0;
      handleVoiceRecognition();
    }
  }

  // Function to open another app or redirect to Play Store
  function openApp() {
    const packageName = 'com.meshnetwork.meshnetworks.testapp';
    const url = `market://details?id=${packageName}`;
    const intentUrl = `intent://#Intent;package=${packageName};scheme=app;end`;

    Linking.canOpenURL(intentUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(intentUrl);
        } else {
          return Linking.canOpenURL(url).then((playStoreSupported) => {
            if (playStoreSupported) {
              return Linking.openURL(url);
            } else {
              Snackbar.show({
                text: 'Unable to open the app. Please check if it is installed.',
                duration: Snackbar.LENGTH_SHORT,
                textColor: 'white',
                backgroundColor: isDarkMode ? '#FF4263' : '#800000',
              });
            }
          });
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
        Snackbar.show({
          text: 'An error occurred while opening the app.',
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: isDarkMode ? '#FF4263' : '#800000',
        });
      });
  }

  // Handle SOS Call (added as a placeholder, customize as per your app's functionality)
const handleSOS = () => {
  const meshengerPackage = 'app.meshenger'; // Package name
  const meshengerActivity = 'd.d.meshenger.StartActivity'; // Full activity name

  // Check if the Meshenger app is installed
  SendIntentAndroid.isAppInstalled(meshengerPackage)
    .then(isInstalled => {
      if (isInstalled) {
        try {
          // Prepare the intent to launch Meshenger's activity
          IntentLauncher.startActivity({
            action: 'android.intent.action.MAIN',
            category: 'android.intent.category.LAUNCHER',
            packageName: meshengerPackage,
            className: meshengerActivity, // Launch specific activity in the package
            flags: IntentConstant.FLAG_ACTIVITY_NEW_TASK, // Start in new task
          });

          console.log('Meshenger app launched successfully');
        } catch (err) {
          console.error('Error launching Meshenger via IntentLauncher', err);
          showSnackbar('Error launching Meshenger via IntentLauncher');
        }
      } else {
        showSnackbar('Meshenger app not found!');
      }
    })
    .catch(err => {
      console.error('Error checking Meshenger app installation', err);
      showSnackbar('Error checking Meshenger app installation');
    });
};



// Helper function to show Snackbar
const showSnackbar = message => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    textColor: 'white',
    backgroundColor: isDarkMode ? '#FF4263' : '#800000',
  });
};

  // CPR Instruction Steps (array format for reusability)
  const cprSteps = [
    {
      title: 'Step-1: Call Emergency Services',
      content: 'If you find a person who is unresponsive, call emergency services immediately.',
      image: require('../../assets/CPR/1.jpg'),
    },
    {
      title: 'Step-2: Open the Airway',
      content: 'Tilt the head back and lift the chin to open the airway.',
      image: require('../../assets/CPR/2.jpg'),
    },
    {
      title: 'Step-3: Give Rescue Breaths',
      content: 'Place your mouth over the victim’s mouth and give 2 rescue breaths.',
      image: require('../../assets/CPR/3.jpg'),
    },
    {
      title: 'Step-4: Begin Chest Compressions',
      content: 'Start chest compressions at a rate of 100-120 compressions per minute.',
      image: require('../../assets/CPR/4.jpg'),
    },
    {
      title: 'Step-5: Repeat Cycles',
      content: 'Continue CPR until emergency help arrives.',
      image: require('../../assets/CPR/5.jpg'),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#121212' : '#ffffff' }}>
      <StatusBar backgroundColor={isDarkMode ? '#232323' : '#F4F4F4'} barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={{ backgroundColor: isDarkMode ? '#232323' : '#F4F4F4', height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color={isDarkMode ? '#FF4263' : '#800000'} />
          </TouchableOpacity>
          <Text style={{ color: isDarkMode ? '#FF4263' : '#800000', fontSize: 24, fontWeight: 'bold' }}>CPR</Text>
          <TouchableOpacity onPress={readOutLoud}>
            <Icon name={isReading ? 'volume-x' : 'volume-2'} size={28} color={isDarkMode ? '#FF4263' : '#800000'} />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>


<View style={{ alignItems: 'center', marginTop: 20 }}>
  <TouchableOpacity
    onPress={handleSOS}
    style={{
      backgroundColor: isDarkMode ? '#FF4263' : '#800000',
      padding: 10,
      borderRadius: 5,
      width: '80%', // Set width to 80% of the screen width
      alignItems: 'center' // Align the text in the center
    }}>
    <Text style={{ color: '#fff', fontSize: 18 }}>SOS Call</Text>
  </TouchableOpacity>
</View>


     <View style={{ alignItems: 'center', marginTop: 20 }}>
       <TouchableOpacity
         onPress={handleSOS}
         style={{
           backgroundColor: isDarkMode ? '#FF4263' : '#800000',
           padding: 10,
           borderRadius: 5,
           width: '80%', // Set width to 80% of the screen width
           alignItems: 'center' // Align the text in the center
         }}>
         <Text style={{ color: '#fff', fontSize: 18 }}>SOS Network</Text>
       </TouchableOpacity>
     </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: 12, paddingVertical: 12 }}>
        {cprSteps.map((step, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 20, fontWeight: 'bold' }}>{step.title}</Text>
            <Image source={step.image} style={{ width: '100%', height: 200, resizeMode: 'contain', marginVertical: 10 }} />
            <Text style={{ color: isDarkMode ? 'white' : 'black', fontSize: 16 }}>{step.content}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
