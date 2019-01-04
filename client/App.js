import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "Balada Finder", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <Text style={styles.title}>App de balada!</Text>
        <Text style={styles.paragraph}>lorem ipsum</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#666"
  },
  paragraph: {
    color: "#000"
  }
});
