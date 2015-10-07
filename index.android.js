'use strict';
var React = require('react-native');
var styles = require('./styles.js');
var {
    AppRegistry,
    BackAndroid,
    CameraRoll,
    Image,
    Text,
    View,
    ListView,
    ScrollView,
    TouchableHighlight
} = React;

var Toolbar = require('./Toolbar');
var ProgressBar = require('ProgressBarAndroid');
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class android_photo extends React.Component{
    constructor(props){
        super(props);
        this._changeBackGround = this._changeBackGround.bind(this);
        this.state = {
            style: 'container',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
            loaded: false
        };
    }
    componentDidMount(){
        // BackAndroid.addEventListener('hardwareBackPress', this._back);
        this.fetchData();
    }

    _back(){
        if (!this.onMainScreen()) {
           this.goBack();
           return true;
         }
         this.setState({style: 'container2'});
         return false;
    }
    _changeBackGround(){
        this.setState({style: 'container2'});
    }
    fetchData() {
      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
            loaded: true,
          });
        })
        .done();
    }
    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={styles.thumbnail} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Toolbar />
                <ProgressBar
                    styleAttr="Small"
                    style={styles.progress}/>
                <Text>Loading movies...</Text>
            </View>
        );
    }
    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.rightContainer}>
                <Toolbar />
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    onScroll={() => { console.log('onScroll!'); }}
                    scrollEventThrottle={200}
                    style={styles.scrollView}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMovie}
                        style={styles.listView} />
                  </ScrollView>
             </View>
        );
    }
}

AppRegistry.registerComponent('android_photo', () => android_photo);
