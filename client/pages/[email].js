import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextArea, Button } from "semantic-ui-react";
import PostList from "../src/components/PostList";

export default function PostEmail() {
  const router = useRouter();
  const { email } = router.query;

  const [post, setPost] = useState([]);

  useEffect(() => {
    Axios.get(
      `/api/read/${email}`,
      { params: { email: email } }
      // { withCredentials: true }
    ).then((res) => {
      setPost(res.data);
    });
  }, [router]);

  function onClickData() {
    console.log("Read ㄱ");
    console.log(JSON.stringify(post, null, 5));
  }

  return (
    <div style={{ margin: 30, display: "flex" }}>
      <Head>
        <title>{email} | Next-Blog</title>
      </Head>
      <h1>{email}</h1>
      <Button onClick={onClickData}>LOG</Button>
      <Button onClick={() => router.push("/write")}>Add Post</Button>
      {post ? <PostList post={post} /> : <h1>로그인이 필요합니다.</h1>}
    </div>
  );
}
