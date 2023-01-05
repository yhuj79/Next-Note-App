import Axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TextArea } from "semantic-ui-react";
import PostGrid from "../../../src/components/PostGrid";

export default function PostContents() {
  const router = useRouter();
  const { email, title } = router.query;

  const [post, setPost] = useState([]);

  useEffect(() => {
    Axios.get(`/api/read/${email}/${title}`, {
      params: { email: email, title: title },
    }).then((res) => {
      setPost(...res.data);
      console.log(post);
    });
  }, [router]);

  return (
    <div>
      <Head>
        <title>{title} | Next-Blog</title>
      </Head>
      {post && (
        <div>
          {/* <h1>{post.title}</h1>
          <TextArea
            defaultValue={JSON.stringify(post, null, 7)}
            rows={30}
            cols={90}
          /> */}
          <PostGrid post={post} />
        </div>
      )}
    </div>
  );
}
