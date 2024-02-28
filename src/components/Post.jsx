import { Image } from "react-native";
import styled from "styled-components/native";
import folder from '../../assets/Folder.png'

const PostView = styled.View`
  flex-direction: row;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-style: solid;
`;

const PostDetails = styled.View`
  flex: 1;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const PostTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

const truncateTitle = (str) => {
  if(str.length >= 50) {
      return str.substring(0, 50) + '...';
  }

  return str;
} 

const Post = ({ title }) => {
  return (
    <PostView>
      <PostDetails>
        <PostTitle>{truncateTitle(title)}</PostTitle>
        <Image source={folder} style={{ width: 40, height: 40 }}/>
      </PostDetails>
    </PostView>
  );
};

export default Post;