import React, {PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ListView,
  TouchableHighlight
} from 'react-native';

let FilmView = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Button onPress={this.props.resetFindFilm} title="Reset" accessibilityLabel="Reset" />
        <Text style={styles.title}>{this.props.film.title}</Text>
        <Image style={styles.img} source={{uri: this.props.film.img}} />
      </View>
    )
  }
})

const FriendButton = ({ onClick, selected, name }) => (
  <Button
    onPress={onClick}
    color={selected ? "#f0f5f5":"#94b8b8"}
    title={name}
  />
)

FriendButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
}


const FindFilmView = ({ idUser , compteur, isFinding, friends, film, selectFriend, findFilm, resetFindFilm }) => (
    <View flex={1}>
    <View flex={1}>
      {!isFinding?
        friends.map((friend)=>
            <TouchableHighlight
              key={friend.name}
              onPress={()=>selectFriend(friend)}>
              <View height={50} style={{flex: 1, flexDirection: 'row'}}
               backgroundColor={friend.selected ? "#b4f6ff":"#f0f5f5"}>
               <Image
                style={{width: 40, height: 40, borderRadius:20, margin:5}}
                source={{uri:friend.picture.data.url}} />
              <Text style={{fontSize:25, margin:5}}>{friend.name}</Text>
              </View>
           </TouchableHighlight>)
        :
        <FilmView resetFindFilm={resetFindFilm} film={film}/> }
      </View>
      <View>
       <Button onPress={()=>{findFilm([idUser, ...(friends.filter(item => {return item.selected}).map(item => item.id))], compteur)}} title="Find film" accessibilityLabel="FindFilm" />
      </View>
    </View>
)

FindFilmView.propTypes = {
  idUser: PropTypes.string.isRequired,
  compteur: PropTypes.number.isRequired,
  isFinding: PropTypes.bool.isRequired,
  friends: PropTypes.array.isRequired,
  film: PropTypes.object.isRequired,
  selectFriend: PropTypes.func.isRequired,
  findFilm: PropTypes.func.isRequired,
  resetFindFilm: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    height: 300,
  },
  img: {
    flex: 1,
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  description: {
    fontSize: 10
  }
})

export default FindFilmView
