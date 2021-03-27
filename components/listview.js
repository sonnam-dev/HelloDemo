import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View,Image, RefreshControl } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refreshing:false,
      pages: 0,
      isLoading: true,
      
    };
  }

  componentDidMount() {
    fetch('http://192.168.1.5/Webservice/vd1.php?pages='+ this.state.pages)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ data: json });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  loadNewData(){
    this.setState({
      refreshing:true,
    });
    fetch('http://192.168.1.5/Webservice/vd1.php?pages='+ this.state.pages)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({ data: json,
        refreshing:false,
        pages:this.state.pages +1, 
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });

  }
  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.loadNewData.bind(this)}
              />
            }
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{padding:20, borderWidth:1 }}>
                <Image source={{uri:item.Hinh}} style={{ width:70, height:100 }} />
                <Text>{item.Id}.</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  }
};