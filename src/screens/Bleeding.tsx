import {
  Text,
  View,
  Image,
  ScrollView,
  NativeModules,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useRoute} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';

import Snackbar from 'react-native-snackbar';

const {MyTTSModule, MySpeechRecognizer} = NativeModules;

export default function Bleeding({navigation}) {
  const route = useRoute();
  const darkMode = route.params.mode;
  const [isReading, setIsReading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);

  const tapCounter = useRef(0);

  useEffect(() => {
    return () => {
      MyTTSModule.stopSpeech();
    };
  }, []);

  const content = `चरण 1: लेट जाएं
                  अगर आप अपने पैरों को ऊँचा उठाते हैं या अपने सिर को धड़ से नीचे रखते हैं, तो इससे सदमे की संभावना कम हो सकती है। अगर आप किसी और की मदद कर रहे हैं, तो आगे बढ़ने से पहले उसकी सांस और रक्त संचार की जांच करें। अगर आपको संदेह है कि जिस व्यक्ति की आप मदद कर रहे हैं, उसे सदमा लग रहा है, तो तुरंत चिकित्सा सहायता लें या आपातकालीन सेवाओं को कॉल करें।

                  चरण 2: घायल हिस्से को उठाएं
                  अगर चोट हाथ-पैर पर है, तो उसे दिल से ऊपर उठाने से गंभीर रक्तस्राव को कम करने में मदद मिलेगी। हालाँकि, अगर आपको हड्डी टूटने का संदेह है, तो उस हिस्से को हिलाने की कोशिश न करें।

                  चरण 3: घाव से मलबा निकालें
                  किसी भी दिखने वाली बाहरी वस्तु और गंदगी को साफ करें, लेकिन घाव को पूरी तरह से साफ न करें, क्योंकि इससे घाव और बढ़ सकता है। आपका तात्कालिक उद्देश्य गंभीर रक्तस्राव को रोकना होना चाहिए। घाव को साफ करने का काम बाद में हो सकता है। हालांकि, अगर कोई बड़ी वस्तु है (जैसे कांच का बड़ा टुकड़ा, चाकू या ऐसी कोई वस्तु), तो उसे न निकालें। यह संभवतः बहुत सारा खून रोक रहा होगा। बस उस वस्तु के आस-पास दबाव डालें, लेकिन ध्यान रखें कि इसे और अंदर न धकेलें।

                  चरण 4: घाव पर सीधा और सख्त दबाव डालें जब तक खून बहना बंद न हो जाए
                  साफ धुंध, पट्टी, या कपड़े का एक पैड उपयोग करें। अगर कुछ भी उपलब्ध न हो तो आपका हाथ भी काम कर सकता है। पैड पर हाथ रखें और अपनी उँगलियों या हाथ से घाव पर सख्त दबाव डालें।

                  चरण 5: दबाव लगातार बनाए रखें
                  अगर चोट हाथ या पैर पर है, तो आप दबाव बनाए रखने के लिए टेप या कपड़े का उपयोग कर सकते हैं (घाव पर रखा हुआ तिकोना पट्टा और बाँधना आदर्श है)। अगर चोट ग्रोइन (जांघ के ऊपरी हिस्से) या शरीर के किसी अन्य हिस्से पर है, जहाँ घाव को लपेटना संभव नहीं है, तो एक भारी पैड का उपयोग करें और अपने हाथों से घाव पर दबाव डालते रहें।

                  चरण 6: घाव से रिसाव देखें
                  अगर मूल पट्टी खून में भीग जाए, तो और धुंध या अतिरिक्त पट्टियाँ लगाएं। हालाँकि, इसे अधिक न लपेटें, क्योंकि इससे घाव पर दबाव कम हो सकता है। अगर आपको संदेह है कि पट्टी काम नहीं कर रही है, तो पट्टी और पैड को हटा दें और पुनः जांच करें। अगर रक्तस्राव नियंत्रित लगता है, तो तब तक दबाव बनाए रखें जब तक कि खून पूरी तरह न रुक जाए या चिकित्सा सहायता न आ जाए।

                  चरण 7: जरूरत पड़ने पर दबाव बिंदु का उपयोग करें
                  अगर आप केवल दबाव से खून रोकने में सफल नहीं हो रहे हैं, तो घाव पर सीधे दबाव के साथ-साथ दबाव बिंदुओं पर भी दबाव डालें। अपनी उँगलियों से रक्त वाहिका को हड्डी के खिलाफ दबाएं। सबसे आमतौर पर उपयोग किए जाने वाले दबाव बिंदु नीचे वर्णित हैं: ब्रेसियल धमनी, निचले हाथ के घावों के लिए। यह बाँह के अंदर कोहनी और बगल के बीच चलती है। फीमोरल धमनी, जांघ के घावों के लिए। यह ग्रोइन के पास बिकिनी लाइन के साथ चलती है। पॉपलिटियल धमनी, निचले पैर के घावों के लिए। यह घुटने के पीछे पाई जाती है।

                  चरण 8: दबाव तब तक बनाए रखें जब तक खून बहना बंद न हो जाए या मदद न आ जाए
                  जब तक आप सुनिश्चित न हों कि खून बहना बंद हो गया है, तब तक दबाव डालना बंद न करें। अगर खून पट्टी के ऊपर से स्पष्ट रूप से नहीं दिख रहा है, तो कभी-कभी घाव की जांच करें कि क्या यह अभी भी बह रहा है। खून बहना बंद होने के 5 मिनट बाद से अधिक समय तक धमनी पर दबाव न डालें। अगर खून बहना जानलेवा है, तो टॉर्निकेट का उपयोग करें। टॉर्निकेट सही ढंग से लगाने पर खून तुरंत बंद कर देता है, लेकिन गलत उपयोग से मरीज़ को नुकसान हो सकता है।

                  चरण 9: पीड़ित की सांस पर ध्यान दें
                  सुनिश्चित करें कि पट्टियाँ बहुत कसी हुई नहीं हैं। अगर पीड़ित की त्वचा ठंडी, पीली है, उसके पैर की उंगलियाँ या उँगलियाँ संपीड़न के बाद सामान्य रंग में नहीं लौट रही हैं, या पीड़ित सुन्नता या झुनझुनी की शिकायत कर रहा है, तो यह संभावना है कि पट्टी बहुत कसी हुई है।
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
      style={{flex: 1, backgroundColor: isDarkMode ? '#121212' : '#ffffff'}}>
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
            Bleeding
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
              Step-1: Lie down
            </Text>
            <View className="flex justify-center h-52">
              <Image
                source={require('../../assets/Bleeding/1.jpg')}
                className="w-full mx-auto max-h-48"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                It will help to lessen the likelihood of shock if you can
                elevate your legs or position your head lower than your trunk.
                If you are helping someone else, check their breathing and
                circulation before proceeding. If you suspect the person you are
                helping is in shock, seek medical attention or call emergency
                services right away.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-2: Elevate the wounded part
            </Text>
            <View className="flex justify-center h-52">
              <Image
                source={require('../../assets/Bleeding/2.jpg')}
                className="w-full mx-auto max-h-48"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                Raising the wounded part (assuming it is an extremity that is
                injured) above the heart will help to reduce severe bleeding. If
                you suspect a broken bone, however, do not attempt to move the
                part.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-3: Remove any debris from the wound
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Bleeding/3.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                Clean up any visible foreign body and dirt, but do not clean the
                wound thoroughly as this can aggravate the wound. Your immediate
                priority is to stop severe bleeding. Cleaning the wound can
                wait. If the foreign object is large, however (e.g., a large
                piece of glass, a knife, or similar), do not remove it. It is
                most likely stopping a lot of the bleeding itself. Just put
                pressure on the area around the object, taking care not to push
                it in further.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-4: Apply firm pressure directly to the wound until the
              bleeding stops
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Bleeding/4.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Use a pad of clean gauze, dressing, or clothing. Even your hand
              can work if nothing else is available. Place your hand over the
              pad and apply firm pressure to the wound with your fingers or a
              hand.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-5: Apply pressure steadily
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Bleeding/5.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              If the injury is on a limb, you can use tape or a cloth wrapped
              around the wound to maintain pressure (a folded triangular bandage
              placed over the wound and tied is ideal). For injuries to the
              groin or other parts of the body where you cannot wrap the wound,
              use a heavy pad and keep using your hands to press on the wound.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-6: Look for seepage from the wound
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Bleeding/6.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Add more gauze or additional bandages if the original soaks
              through. Do not over-wrap it, however, as increased bulk risks
              reducing pressure on the wound. If you suspect the bandage is not
              working, remove the bandage and pad and reassess the
              application.[8] If the bleeding appears controlled, maintain
              pressure until you are sure the bleeding has stopped or medical
              help has arrived.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-7: Use pressure points, if necessary
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Bleeding/7.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              If you cannot stop the bleeding by pressure alone, combine using
              direct pressure to the wound with pressure to one of these
              pressure points. Use your fingers to press the blood vessel
              against the bone. The most commonly needed pressure points are
              described below: The brachial artery, for wounds on the lower arm.
              Runs on the inside of the arm between the elbow and armpit. The
              femoral artery, for thigh wounds. Runs along the groin near the
              bikini line. The popliteal artery, for wounds on the lower leg.
              This is found behind the knee.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-8: Continue applying pressure until the bleeding stops or
              help arrives
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Bleeding/8.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Do not stop applying pressure unless you are certain the bleeding
              has stopped. If blood is not obviously soaking through the
              dressing, check the wound occasionally to see if it is still
              bleeding. Do not apply pressure to an artery for longer than 5
              minutes after the bleeding has stopped. Use a tourniquet if the
              bleeding is life-threatening. Tourniquets usually stop bleeding
              instantly if applied correctly, but incorrect tourniquet use can
              harm the patient.
            </Text>
          </View>
          <View className="mt-5 mb-[90px]">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-9: Monitor the victim’s breathing
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Bleeding/9.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Check that the bandages are not too tight. If the victim has cold,
              pale skin, toes or fingers that do not restore to normal color
              after compression, or the victim complains of numbness or
              tingling, it is probable that the bandaging is too tight.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
