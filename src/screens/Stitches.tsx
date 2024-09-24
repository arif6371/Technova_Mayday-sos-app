import {
  Text,
  View,
  ScrollView,
  Image,
  NativeModules,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useRoute} from '@react-navigation/native';

const {MyTTSModule, MySpeechRecognizer} = NativeModules;

import Snackbar from 'react-native-snackbar';

import Icon from 'react-native-vector-icons/Feather';

export default function Stitches({navigation}) {
  const route = useRoute();
  const darkMode = route.params.mode;
  const [isReading, setIsReading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  useEffect(() => {
    return () => {
      MyTTSModule.stopSpeech();
    };
  }, []);

  const tapCounter = useRef(0);

  const content = `चरण 1: आवश्यक उपकरण इकट्ठा करें
  सूट्यरिंग तकनीकों का अभ्यास करने के लिए, आपको एक स्यूचर पैड की आवश्यकता होगी। इसे आसानी से ऑनलाइन या ऑफलाइन प्राप्त किया जा सकता है। टिश्यू फोर्सेप्स घाव को खोलता है और सुई के छिद्र स्थल को साफ दृष्टि प्रदान करता है। कैंची अतिरिक्त धागे को काटने के लिए। सुई होल्डर: कीटाणुओं के प्रसार को रोकने के लिए, सुई को हमेशा सुई होल्डर से ही पकड़ना चाहिए, इसे अपने हाथों से पकड़ने की बजाय। सुई के साथ धागा: सुई के आकार और धागे के प्रकार का चुनाव स्यूचरिंग करने के कारण और घाव की प्रकृति पर निर्भर करता है। निम्नलिखित चरणों में इस्तेमाल की जाने वाली सुई 2-0 सिल्क है।

  चरण 2: उपकरणों को सही तरीके से पकड़ें
  दाएं हाथ वालों के लिए, सुई होल्डर को अपने दाएं हाथ की अनामिका और अंगूठे से पकड़ें। अधिक नियंत्रण और स्थिरता के लिए, अपनी तर्जनी और मध्यमा अंगुलियों को सुई होल्डर के लंबे हिस्से पर रखें।

  चरण 3: सुई होल्डर का उपयोग करके सुई को उसके पैकेज से निकालें
  ध्यान से सभी धागे को बाहर खींचें बिना घाव को और नुकसान पहुँचाए। सुई को उसके चपटे हिस्से से सुई होल्डर के उपयोग से पकड़ें। इसे सुई के टिप से लगभग 2/3 ऊपर पकड़ें, और सुई को ऊपर की ओर इंगित करें। अपनी अनामिका और अंगूठे से दबाएं जब तक कि सुई होल्डर से क्लिक की आवाज़ न आ जाए।

  चरण 4: टिश्यू फोर्सेप्स का उपयोग करके घाव के दाहिने किनारे की त्वचा को उजागर करें
  यह बेहतर दृश्यता की अनुमति देता है और मांसपेशियों से टकराने से बचाता है। यह कदम हमेशा त्वचा को छेदने से पहले किया जाना चाहिए, जिसे अगले चरण में प्रस्तुत किया गया है। याद रखें कि टिश्यू फोर्सेप्स के साथ त्वचा पर दबाव डालने से हमेशा बचें।

  चरण 5: त्वचा के दाहिने हिस्से में छेद करें (बाइट लें)
  घाव के अंत से लगभग आधा सेमी नीचे का लक्ष्य रखें और सुई और त्वचा के बीच 90 डिग्री का कोण बनाएं, अपने हाथ को लगभग आधा चक्र घड़ी की दिशा में घुमाएं। सुई त्वचा के बाहर से अंदर की ओर जाती है। यह सुनिश्चित करें कि सुई त्वचा के अंदरूनी हिस्से में बाहर निकलती है; यह लगभग 0.5 सेमी की गहराई तक जानी चाहिए। सुई को खींचने के लिए सुई होल्डर की "क्लिक" को रिलीज़ करने के लिए, सुई होल्डर को अपनी अनामिका से दाईं ओर खींचें और अपने अंगूठे से बाईं ओर दबाएं।

  चरण 6: पहले बाइट के समानांतर, पिछले चरण की तरह ही त्वचा के बाएँ हिस्से में छेद करें
  हालाँकि, इस चरण में, सुई अंदर से बाहर की ओर जाती है।

  चरण 7: सुई होल्डर के साथ हल्के से धागे को खोलें, सुई होल्डर के साथ दाहिनी ओर के धागे के 3-5 सेंटीमीटर (1.2-2.0 इंच) को पकड़ें
  अपने बाएँ हाथ का उपयोग करके, लंबे धागे को खींचें ताकि सुई होल्डर से धागा निकल सके और दाहिने हिस्से के ढीले धागे के चारों ओर बंध जाए। सावधान रहें कि त्वचा पर बहुत अधिक खींचाव न हो, जिससे एक पक्ष दूसरे पर धकेला जा सके। केवल इतना ही खींचें जितना आपको घाव के दोनों किनारों को एक साथ लाने और सील करने की आवश्यकता है।

  चरण 8: अगले चरणों में थोड़े बदलाव के साथ चरण 5 से 7 को दोबारा करें
  नोट: ये तीन चरण (5 से 7) कुल मिलाकर 3 बार किए जाएंगे, और उनमें हर बार थोड़ा बदलाव होगा। पहले, चरण 5 से 7 करें, सुई होल्डर के चारों ओर धागे को दो बार अंदर की ओर (घड़ी की विपरीत दिशा में) लपेटें। फिर, चरण 5 से 7 तीसरी बार करें, इस बार धागे को सुई होल्डर के चारों ओर केवल एक बार बाहर की ओर (घड़ी की दिशा में) लपेटें।
  .`;

  function readOutLoud() {
    setIsReading(prev => !prev);
    if (!isReading) {
      MyTTSModule.speak(content)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      MyTTSModule.stopSpeech();
    }
  }

  function handleVoiceRecognition() {
    if (isReading) {
      setIsReading(false);
      MyTTSModule.stopSpeech();
    }

    MySpeechRecognizer.startVoiceRecognition((error, recognizedText) => {
      if (error) {
        Snackbar.show({
          text: `Sorry :( Couldn't hear that`,
          duration: Snackbar.LENGTH_SHORT,
          textColor: 'white',
          backgroundColor: isDarkMode ? '#FF4263' : '#800000',
        });
      } else {
        const lowerCaseText = recognizedText.toString().toLowerCase();
        if (
          lowerCaseText === 'go back' ||
          lowerCaseText === 'go home' ||
          lowerCaseText === 'go to home' ||
          lowerCaseText === 'go to home page' ||
          lowerCaseText === 'go to homepage'
        ) {
          navigation.goBack();
        } else if (
          lowerCaseText === 'start' ||
          lowerCaseText === 'speak' ||
          lowerCaseText === 'start speaking'
        ) {
          readOutLoud();
        } else {
          Snackbar.show({
            text: `Sorry :( Couldn't decode that`,
            duration: Snackbar.LENGTH_SHORT,
            textColor: 'white',
            backgroundColor: isDarkMode ? '#FF4263' : '#800000',
          });
        }
      }
    });
  }

  function handleDoubleTap() {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;
    if (
      tapCounter.current === 0 ||
      now - tapCounter.current > DOUBLE_PRESS_DELAY
    ) {
      tapCounter.current = now;
    } else if (
      tapCounter.current &&
      now - tapCounter.current <= DOUBLE_PRESS_DELAY
    ) {
      tapCounter.current = 0;
      handleVoiceRecognition();
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#121212' : '#ffffff',
      }}>
      <StatusBar
        backgroundColor={isDarkMode ? '#232323' : '#F4F4F4'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View
          className="h-16 flex items-center justify-between px-4 flex-row"
          style={{backgroundColor: isDarkMode ? '#232323' : '#F4F4F4'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              size={30}
              color={isDarkMode ? '#FF4263' : '#800000'}
            />
          </TouchableOpacity>
          <Text
            className="font-bold text-3xl"
            style={{color: isDarkMode ? '#FF4263' : '#800000'}}>
            Stitches
          </Text>
          <TouchableOpacity onPress={readOutLoud}>
            {isReading ? (
              <Icon
                name="volume-x"
                size={28}
                color={isDarkMode ? '#FF4263' : '#800000'}
              />
            ) : (
              <Icon
                name="volume-2"
                size={28}
                color={isDarkMode ? '#FF4263' : '#800000'}
              />
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <ScrollView className="mx-3 py-3" showsVerticalScrollIndicator={false}>
          <View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-1: Gather the necessary equipment
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/1.jpg')}
                className="w-full mx-auto max-h-64"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                To practice the suturing techniques, you will need a suture pad.
                It can easily be obtained online or offline. Tissue forceps:
                opens up wound and allows clear vision of the needle's puncture
                site Scissors: To cut excess thread. Needle holder: To prevent
                the spread of germs, the needle must always be held by the
                needle holder rather than being held with your hands. Needle
                with thread: The choice of the needle size and thread type
                depend on the reason for performing a suture and the nature of
                the wound. The needle with thread used in the following steps is
                2-0 silk.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-2: Hold the tools correctly
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/2.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                For right-handed people, hold the needle holder with your right
                ring finger and thumb. For more control and stability, place
                your index and middle fingers on the long side of the needle
                holder.
              </Text>
              <View className="flex justify-center h-48">
                <Image
                  source={require('../../assets/Stitches/3.jpg')}
                  className="w-full mx-auto max-h-44"
                  style={{objectFit: 'contain'}}
                />
              </View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                Left-handed people can follow the same steps (including those
                below) but should replace the tools used with the left hand with
                those used by the right hand, and vice versa. The tissue forceps
                are to be held by the left hand with the thumb and index
                fingers, just like holding a pen.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-3: With the needle holder, take out the needle from its
              package
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/4.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>

            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                Make sure to pull all the thread out carefully without damaging
                the wound further.
              </Text>

              <View className="flex justify-center h-48">
                <Image
                  source={require('../../assets/Stitches/5.jpg')}
                  className="w-full mx-auto max-h-44"
                  style={{objectFit: 'contain'}}
                />
              </View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                Hold the needle by its flat side using the needle holder. Hold
                it approximately 2/3 of the way up from the needle's tip, which
                should be pointing upwards. Press down with your thumb and ring
                finger until you hear a click from the needle holder.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-4: Using the tissue forceps, expose the skin towards the end
              of the right side of the wound
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/6.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              This allows for better visualization and avoids hitting muscle.
              This step should always be done before puncturing the skin, which
              is introduced in the next step. Remember to always avoid pushing
              down on the skin with the tissue forceps.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-5: Puncture the right side of the skin (take a bite)
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/7.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Aim for about half a cm down from the end of the wound with a 90
              degrees angle between the skin and the needle, twisting your hand
              clockwise for about half a circle.[4] The needle goes through the
              skin from outside to inside. Also, make sure that you the needle
              exits on the inner side of the skin; it should go down to a depth
              of about 0.5cm. To release the needle holder's "click" to pull the
              needle out, pull the needle holder with your ring finger to the
              right and push with your thumb to the left.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-6: Parallel to the first bite, puncture the left side of the
              skin the same way as you did in the last step
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/9.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              However, in this step, the needle goes from inside to outside.
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/10.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Hold the needle with the needle holder (without the need to hear a
              click) and pull so that all the thread, except for about 3–5
              centimeter (1–2 in), is on the left side of the wound.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-7: Slightly open the needle holder with the thread wrapped
              around it, grab the 3–5 centimeter (1.2–2.0 in) of thread on the
              right side with the needle holder
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/11.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Using your left hand, pull the long thread to allow the wrapped
              thread to pass out of the needle holder and get tied around the
              loose 3–5 centimeter (1.2–2.0 in) of thread on the right. Be
              careful to NOT pull too much on the skin, causing one side to be
              pushed on top of the other. Only pull as much as you need in order
              to bring together and seal the two sides of the wound.
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Stitches/12.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
          </View>
          <View className="mt-3 mb-[90px]">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-8: Next, do steps 5 to 7 again with a couple of alterations
            </Text>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Note: these three steps (5 to 7) will be done a total of 3 times,
              with a small difference in them each time. First, do steps 5 to 7,
              wrapping the thread inwards (counterclockwise) twice around the
              needle holder. Then, do steps 5 to 7 a third time, wrapping the
              thread only once outwards (clockwise) on the needle holder.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
