import Head from "next/head";
import { useRouter } from "next/router";
import Spinner from "../../src/components/Spinner";
import PostList from "../../src/components/PostList";
import { Icon } from "semantic-ui-react";
import prisma from "../../hooks/prisma";
import Link from "next/link";

export default function PostAll({ postAll, email }) {
  const router = useRouter();
  console.log(postAll);
  if (router.isFallback) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Head>
          <title>{`${email} | Next-Blog`}</title>
        </Head>
        {postAll ? (
          <PostList postAll={postAll} email={email} />
        ) : (
          <div
            style={{ padding: "200px 0", textAlign: "center", fontSize: 30 }}
          >
            <Icon name="warning circle" color="red" />
            <p>작성한 글이 없거나 존재하지 않는 블로그입니다.</p>
            <Link href="/">Next-Blog 메인</Link>
          </div>
        )}
      </div>
    );
  }
}

export async function getStaticPaths() {
  const user = await prisma.user.findMany();
  return {
    paths: user.map((m) => ({
      params: {
        email: m.email,
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const post = await prisma.post.findMany({
    where: {
      email: `${params.email}@gmail.com`,
    },
  });
  const email = params.email;

  if (post.length > 0) {
    const postAll = JSON.parse(JSON.stringify(post));
    return {
      props: { postAll, email },
      revalidate: 10,
    };
  } else {
    const postAll = false;
    return {
      props: { postAll, email },
      revalidate: 10,
    };
  }
}
