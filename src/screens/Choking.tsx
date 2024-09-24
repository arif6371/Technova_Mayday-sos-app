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

export default function Choking({navigation}) {
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

  const content1 = `चरण 1: स्थिति का आकलन करें
  सुनिश्चित करें कि व्यक्ति का दम घुट रहा है और यह निर्धारित करें कि यह आंशिक या पूर्ण वायुमार्ग अवरोध है। अगर किसी व्यक्ति को हल्का दम घुट रहा है, या आंशिक वायुमार्ग अवरोध है, तो उसे खुद से अवरोध हटाने के लिए खाँसने दें। आंशिक वायुमार्ग अवरोध के संकेतों में बोलने, रोने, खाँसने या आपके जवाब देने की क्षमता शामिल होती है। व्यक्ति आमतौर पर सांस भी ले सकता है, हालांकि यह थोड़ा कठिन हो सकता है और व्यक्ति का चेहरा पीला पड़ सकता है। इसके विपरीत, जिस व्यक्ति को वायुमार्ग का पूर्ण अवरोध हो रहा है, वह बोलने, रोने, खाँसने या सांस लेने में असमर्थ होगा। इसके अलावा, आप देख सकते हैं कि व्यक्ति "दम घुटने का संकेत" बना रहा है (दोनों हाथ गले पर पकड़े हुए हैं) और उसके होंठ और नाखून नीले पड़ सकते हैं, क्योंकि शरीर को ऑक्सीजन नहीं मिल रही है।

  चरण 2: प्राथमिक चिकित्सा प्रदान करें
  अगर व्यक्ति का दम गंभीर रूप से घुट रहा है या उसे पूर्ण वायुमार्ग अवरोध हो रहा है और वह होश में है, तो उसे यह बताएं कि आप उसे प्राथमिक चिकित्सा देने का इरादा रखते हैं। यह सुनिश्चित करना अच्छा होता है कि कोई होश में व्यक्ति जानता हो कि आप क्या करने जा रहे हैं; इससे उसे यह अवसर भी मिलेगा कि वह आपको बता सके कि क्या वह आपकी सहायता चाहता है। अगर आप अकेले हैं और व्यक्ति की मदद कर सकते हैं, तो आपातकालीन सेवाओं को कॉल करने से पहले नीचे वर्णित प्राथमिक चिकित्सा करें। अगर कोई अन्य मौजूद है, तो उसे सहायता के लिए कॉल करने के लिए कहें।

  चरण 3: पीठ पर थपथपाएं
  व्यक्ति के पीछे खड़े हों और थोड़ा एक तरफ। अगर आप दाएं हाथ से काम करते हैं, तो बाईं ओर खड़े हों, और अगर आप बाएं हाथ से काम करते हैं, तो दाईं ओर खड़े हों। एक हाथ से व्यक्ति की छाती को सहारा दें और उसे आगे की ओर झुकाएं ताकि वायुमार्ग को अवरोधित करने वाली वस्तु उसके मुँह से बाहर निकल जाए (गले में और नीचे न जाए)। अपने हाथ की एड़ी (हथेली और कलाई के बीच) से व्यक्ति के कंधों के बीच जोर से 5 थपथपाएं। हर थपथपाने के बाद रुकें और देखें कि अवरोध हटा है या नहीं। अगर नहीं, तो 5 बार पेट पर जोर दें (नीचे देखें)।

  चरण 4: पेट पर जोर दें
  हैमलिक पद्धति एक आपातकालीन तकनीक है जो केवल वयस्कों और 1 वर्ष से अधिक आयु के बच्चों पर इस्तेमाल की जाती है। 1 वर्ष से कम उम्र के बच्चों पर हैमलिक पद्धति का उपयोग न करें। दम घुटने वाले व्यक्ति के पीछे खड़े हों। उसकी कमर के चारों ओर अपने हाथ रखें और उसे आगे झुकाएं। अपने हाथ से मुठ्ठी बनाएं और इसे व्यक्ति की नाभि (बेली बटन) के ठीक ऊपर लेकिन सीने की हड्डी के नीचे रखें। अपनी पहली मुठ्ठी के ऊपर दूसरा हाथ रखें, फिर दोनों हाथों से व्यक्ति के पेट में जोर से धक्का दें, ऊपर की ओर एक तीव्र गति से। यह धक्का 5 बार तक करें। हर धक्के के बाद देखें कि अवरोध हटा है या नहीं। अगर व्यक्ति बेहोश हो जाए तो रुक जाएं।.`;

    const content2 = `चरण 5: गर्भवती महिलाओं और मोटे लोगों के लिए हैमलिक पद्धति में संशोधन करें
  हैमलिक पद्धति की सामान्य तकनीक में वर्णित से ऊपर की ओर हाथ रखें। आपके हाथ सीने की हड्डी के आधार पर होने चाहिए, जहाँ सबसे निचली पसलियाँ मिलती हैं। ऊपर वर्णित के अनुसार, तेजी से धक्का दें। हालांकि, आप वैसा ही ऊपर की ओर धक्का नहीं दे पाएंगे। इसे तब तक दोहराएं जब तक व्यक्ति का दम घुटना बंद न हो जाए और अवरोध दूर न हो जाए, या वह बेहोश न हो जाए।

  चरण 6: सुनिश्चित करें कि वस्तु पूरी तरह से निकल गई है
  एक बार वायुमार्ग साफ हो जाने पर, वह वस्तु जो व्यक्ति के दम घुटने का कारण बनी, उसके कुछ हिस्से पीछे रह सकते हैं। अगर व्यक्ति सक्षम हो, तो उसे उसे थूकने और बिना किसी कठिनाई के सांस लेने के लिए कहें। यह देखें कि क्या वायुमार्ग में कुछ फंसा हुआ है। अगर है, तो आप अपनी उंगली से व्यक्ति के मुँह के अंदर स्वाइप करके उसे बाहर निकाल सकते हैं। केवल तभी स्वाइप करें जब आपको कोई वस्तु दिखाई दे, अन्यथा आप इसे और गहराई में धकेल सकते हैं।

  चरण 7: देखें कि क्या सामान्य सांस वापस आ गई है
  वस्तु के निकल जाने के बाद, अधिकांश लोग सामान्य रूप से सांस लेने लगते हैं। अगर सामान्य सांस वापस नहीं आई या व्यक्ति बेहोश हो गया, तो अगले चरण पर जाएं।

  चरण 8: अगर व्यक्ति बेहोश हो जाए तो सहायता प्रदान करें
  अगर किसी दम घुटने वाले व्यक्ति को बेहोशी आ जाए, तो उसे उसकी पीठ पर फर्श पर लिटा दें। फिर, अगर संभव हो, तो वायुमार्ग साफ करें। अगर आपको अवरोध दिखाई देता है, तो अपनी उंगली से उसे गले से निकालें और मुँह के बाहर कर दें। अगर कोई वस्तु दिखाई न दे, तो उंगली से स्वाइप न करें। सावधान रहें कि अवरोध को गलती से और गहराई में न धकेलें।

  चरण 9: चिकित्सक से परामर्श लें
  अगर दम घुटने के बाद व्यक्ति को लगातार खाँसी, सांस लेने में कोई कठिनाई, या यह महसूस हो कि उसके गले में अभी भी कुछ फंसा हुआ है, तो उसे तुरंत चिकित्सा विशेषज्ञ को दिखाना चाहिए। पेट पर जोर देने से आंतरिक चोटें और नीले निशान भी हो सकते हैं। अगर आपने यह पद्धति का इस्तेमाल किया हो या किसी अन्य व्यक्ति पर सीपीआर किया हो, तो उसे बाद में चिकित्सक से जाँच करानी चाहिए।.`;

  async function readOutLoud() {
    setIsReading(prev => !prev);
    if (!isReading) {
      try {
        const result1 = await MyTTSModule.speak(content1);
        console.log(result1);

        const result2 = await MyTTSModule.speak(content2);
        console.log(result2);
      } catch (error) {
        console.error(error);
      }
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
            Choking
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
              Step-1: Assess the situation
            </Text>
            <View className="flex justify-center h-52">
              <Image
                source={require('../../assets/Choking/1.jpg')}
                className="w-full mx-auto max-h-48"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                Make sure the person is choking and determine whether it is a
                partial or total airway obstruction. If a person is experiencing
                mild choking, or partial airway obstruction, you are better off
                letting him cough to remove the obstruction himself. Signs of
                partial airway obstruction include the ability to speak, cry
                out, cough or respond to you. The person will also usually be
                able to breathe, though it may be slightly labored and the
                person may grow pale in the face. In contrast, someone
                experiencing a total obstruction of the airway will not be able
                to speak, cry, cough or breathe. In addition, you may notice the
                person making the "choking sign" (both hands clutched to the
                throat) and his lips and fingernails may turn blue due to lack
                of oxygen.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-2: Administer first-aid
            </Text>
            <View className="flex justify-center h-52">
              <Image
                source={require('../../assets/Choking/2.jpg')}
                className="w-full mx-auto max-h-48"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                If the person is choking severely or suffering from a total
                airway obstruction and is conscious, communicate your intent to
                perform first aid. It's a good idea to make sure that someone
                who is conscious know what you plan to do; this will also give
                him an opportunity let you know if your assistance is welcomed.
                If you are the only person present who can help the person,
                perform the first aid described below before calling emergency
                services. If someone else is available, get him to call for
                assistance.
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-3: Give back blows
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Choking/3.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <View>
              <Text
                style={{color: isDarkMode ? 'white' : 'black'}}
                className="text-[17px]">
                Stand behind the person and slightly off to one side. If you’re
                right-handed, stand to the left and if you’re left-handed, stand
                to the right. Support the person's chest with one hand and lean
                the person forward so that the object blocking his airway will
                exit his mouth (as opposed to going further down the throat).
                Administer up to 5 forceful blows between the person’s shoulder
                blades with the heel of your hand (between your palm and wrist).
                Pause after each blow to see if the blockage has cleared. If
                not, give up to five abdominal thrusts (see below).
              </Text>
            </View>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-4: Administer abdominal thrusts
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Choking/4.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              The Heimlich maneuver is an emergency technique that is only to be
              used on adults or children older than 1 year of age. Do not use
              the Heimlich maneuver on children under 1 year old Stand behind
              the choking victim. Put your arms around his waist and lean him
              forward Make a fist with your hand and place it directly above the
              person's navel (belly button) but below the breastbone. Put your
              other hand on top of your first, then thrust both hands backwards
              into their stomach with a hard, upward movement. Do this thrusting
              action up to five times. Check after each thrust to see if the
              blockage is gone. Stop if the victim loses consciousness.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-5: Modify the Heimlich maneuver for pregnant women and people
              who are obese
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Choking/5.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Place your hands higher than described above in the regular
              Heimlich maneuver technique. Your hands should be at the base of
              the breast bone, just above where the lowest ribs join. Press hard
              into the chest with quick thrusts as described above. However, you
              will not be able to make the same upward thrusts. Repeat until the
              person stops choking and the blockage is dislodged or he falls
              unconscious.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-6: Make sure the object is completely gone
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Choking/6.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Once the airway is cleared, parts of the object that caused the
              person to choke can remain behind. If the person is able, ask the
              victim to spit it out and breathe without difficulty. Look to see
              if there is something blocking the airway. If there is, you can
              also do a sweep through the person's mouth with your finger. Only
              sweep if you see an object, otherwise you could push it further
              back.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-7: Check to see if normal breathing has returned
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Choking/7.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              Once the object is gone, most people will return to breathing
              normally. If normal breathing has not returned or if the person
              loses consciousness, move to the next step.
            </Text>
          </View>
          <View className="mt-5">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-8: Administer help if the person falls unconscious
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Choking/8.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              If a choking person falls unconscious, lower him on his back onto
              the floor. Then, clear the airway if possible. If you can see the
              blockage, take your finger and sweep it out of the throat and out
              through the mouth. Don't do a finger sweep if you don't see an
              object. Be careful not to inadvertently push the obstruction
              deeper into the airway.
            </Text>
          </View>
          <View className="mt-5 mb-[90px]">
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-lg font-bold">
              Step-9: Consult a physician
            </Text>
            <View className="flex justify-center h-48">
              <Image
                source={require('../../assets/Choking/9.jpg')}
                className="w-full mx-auto max-h-44"
                style={{objectFit: 'contain'}}
              />
            </View>
            <Text
              style={{color: isDarkMode ? 'white' : 'black'}}
              className="text-[17px]">
              If after choking, the person experiences a persistent cough, any
              difficulty breathing or a feeling that something is still stuck in
              his throat, he should see a medical professional immediately.
              Abdominal thrusts can also cause internal injuries and bruising.
              If you used this tactic or performed CPR on another person, he
              should be checked out by a physician afterwards.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
