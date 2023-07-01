import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";
import navigationStrings from "../../Components/Navigation/NavigationStrings/navigationStrings";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import auth from "@react-native-firebase/auth";
export default function SplashScreen({navigation}) {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // Check if currentUser is set or not
      // If not then send for Authentication
      // else send to Home Screen

        auth().currentUser ? navigation.navigate(navigationStrings.WELCOME) : navigation.navigate(navigationStrings.AUTH)

    }, 5000);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#307ecc" }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../Components/Assets/Images/splash.gif")}
          style={{
            width: "90%",
            resizeMode: "contain",
            margin: 30,
          }}
        />
        <ActivityIndicator
          animating={animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});