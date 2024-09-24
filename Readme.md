Mayday: Offline SOS & Emergency Response App
Mayday is a Kotlin and TypeScript-based emergency app that ensures seamless communication and assistance, even in areas without internet connectivity. It empowers users to send SOS signals, make voice/video calls, and access critical information via mesh networks, making it ideal for use in remote locations or during disasters when traditional communication channels are down.

Table of Contents
Motivation
Features
Unique Mesh Network Features
Architecture
Installation
Usage
Design
License
Motivation
Mayday was developed to tackle the problem of communication failures during natural disasters, network outages, or in remote areas. When regular internet-based apps fail, Mayday’s offline-first design ensures that users can send out SOS signals, access first aid information, and communicate without needing a network connection.

Features
🌐 Offline Communication & SOS
Offline SOS Messaging: Send distress signals without internet or cellular connection.
Predefined Emergency Contacts: Instantly notify trusted contacts with location information and distress messages via SMS or over the mesh network.
GPS Location Sharing: Share your exact location with rescuers or friends even when offline.
📍 Location Tracking & Mapping
Offline Maps: Track your location and pinpoint others around you using GPS, without relying on internet maps.
Location-Based Alerts: Receive location-triggered alerts to ensure help is nearby.
🚑 Emergency First Aid Guide
Access comprehensive first aid guides and life-saving techniques for handling emergencies such as fractures, burns, or CPR.
Use natural voice commands for easy navigation of first aid instructions.
🎙️ Voice Command Integration
Hands-free interactions with the app using voice commands. For instance, "Help with burns" will guide you through first aid steps.
🔗 Mesh Network Communication
Establishes a local mesh network over WiFi to communicate directly with nearby devices, allowing text messages, voice, and video calls even without internet.
Unique Mesh Network Features
Mayday harnesses the power of mesh networks for seamless offline communication, setting it apart from other emergency apps.

🌐 Mesh Networking for Communication
Decentralized Communication: Devices communicate without a central server, forming a resilient network. Mayday devices can act as nodes, passing messages between users over multiple hops to extend coverage.

Data Transmission Without Internet: Data such as SOS messages, location data, and voice/video calls are transmitted directly between devices using the mesh network, even in the most remote locations.

Fast and Reliable: The mesh network allows high-speed (300Mbps+) data transfer across large areas, such as remote towns, hiking trails, or disaster zones.

Architecture
The Mayday app is built using:

Frontend: Kotlin for Android and TypeScript for web services.
Backend: Built using decentralized communication protocols to support peer-to-peer mesh networking.
Encryption: End-to-end encryption using libsodium ensures that all communications remain private and secure.
Installation
Android Installation
To install the app on your Android device, follow these steps:

Clone the Repository:

bash
Copy code
git clone https://github.com/username/mayday-sos.git
Open in Android Studio:

Open the project in Android Studio.
Ensure the necessary SDKs are installed.
Build the project using ./gradlew assembleRelease.
Install the APK:

Once the build is complete, install the APK on your device.
Running in Dev Mode
bash
Copy code
./gradlew assembleDebug
Usage
Set Up Emergency Contacts: Configure trusted contacts who will receive your SOS messages and location data in case of emergency.

Enable Location Services: Turn on GPS to allow for offline location tracking.

Use SOS Button: Press the SOS button during an emergency to trigger distress signals and location sharing.

Make Offline Calls: Utilize the mesh network to make voice and video calls without internet.

Design
SOS Button
Detailed Design
The SOS button is central to Mayday's interface, ensuring quick access in emergencies. The button features:

Bright Red Design: Stands out visually to ensure immediate access.
Tap to Activate: One-tap activation to send SOS signals, location data, and trigger emergency alerts.
Clear Confirmation: A clear confirmation popup informs the user when SOS signals are successfully sent.
Design Image:

The SOS button has been designed with an intuitive interface that makes it accessible even under stress, with large, bold icons and a simple tap-to-trigger mechanism.

License
Mayday is open source under the MIT License. Contributions and forks are welcome!

Mayday is the go-to solution for providing emergency communication when traditional methods fail. With powerful offline features, mesh network communication, and life-saving first aid guides, Mayday ensures safety and connectivity even in the harshest conditions.
