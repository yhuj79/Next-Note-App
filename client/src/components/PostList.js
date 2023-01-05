import { useRouter } from "next/router";
import { Button, Icon, Image, Item, Label } from "semantic-ui-react";

export default function PostList({ post }) {
  const router = useRouter();
  const { email } = router.query;
  return (
    <Item.Group divided>
      {post.map((m) => (
        <Item key={m.id} onClick={() => router.push(`/${email}/${m.title}`)}>
          <Item.Image src={`/images/${m.id}.png`} />
          <Item.Content>
            <Item.Header as="a">{m.title}</Item.Header>
            <Item.Meta>
              <span className="cinema">{m.desc}</span>
            </Item.Meta>
            <Item.Description>{m.createdAt}</Item.Description>
            <Item.Extra>
              <Label>{m.category}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
}
