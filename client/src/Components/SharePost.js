import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { savePost } from "../Features/PostSlice";
import { useDispatch } from "react-redux";

const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");
  const { user } = useSelector((state)=> state.users);
  const dispatch = useDispatch();


  const handlePost = async () => {
    if (!postMsg.trim()) {
      alert("Post message is required."); 
      return; 
    }
    const postData = {
      postMsg: postMsg,
      email: user.email
    }
    dispatch(savePost(postData)); 
    setpostMsg("")

  };
  return (
    <Container>
      <Row>
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your thoughts..."
            type="textarea"
            value={postMsg}
            onChange={e =>setpostMsg(e.target.value)}
          />
          <Button onClick={handlePost}>PostIT</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
