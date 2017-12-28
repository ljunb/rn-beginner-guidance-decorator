import React, { Component } from 'react';
import { View, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  guide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const errorMsg = `[rn-beginner-guidance-decorator] Arguments error exception: 
the "injectGuidance" function requires a key named "displayName" in second parameter,
you should invoke it in the way such as like "injectGuidance(GuidanceComponent, {displayName})".
`;

const injectGuidance = (GuidanceComponent, {displayName, dismissEnabled = true}) => WrapperComponent => class extends Component {
  static displayName = `BeginnerGuidanceDecorator_${displayName}`;

  state = {
    showGuide: false,
  };

  componentWillMount() {
    if (displayName === undefined) throw new Error(errorMsg);
    this.setupGuidance();
  }

  setupGuidance = async () => {
    try {
      const result = await AsyncStorage.getItem(`BeginnerGuidanceDecorator_${displayName}`);
      if (!result) {
        this.setState({showGuide: true});
        AsyncStorage.setItem(`BeginnerGuidanceDecorator_${displayName}`, JSON.stringify({}));
      }
    } catch (e) {
      console.log(`[BeginnerGuidanceDecorator_${displayName}] setup guidance error: ${e}`);
    }
  };

  handleDismiss = () => {
    this.setState({showGuide: false});
    AsyncStorage.setItem(`BeginnerGuidanceDecorator_${displayName}`, JSON.stringify({}));
  };

  render() {
    const { showGuide } = this.state;

    return (
      <View style={{flex: 1}}>
        <WrapperComponent {...this.props} />
        {showGuide &&
          <TouchableOpacity
            activeOpacity={1}
            disabled={!dismissEnabled}
            style={styles.guide}
            onPress={this.handleDismiss}
          >
            <GuidanceComponent onDismiss={this.handleDismiss} />
          </TouchableOpacity>
        }
      </View>
    );
  }
};

export { injectGuidance };