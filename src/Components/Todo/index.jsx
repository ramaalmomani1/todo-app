import React, { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/form";
import './todo.css'
import {
  Title,
  Grid,
  Flex,
  Button,
  TextInput,
  Text,
  Slider,
} from "@mantine/core";
import List from "../List/List";
import { ListContext } from "../Context/ListOfData/ListOfData";
import LoginForm from "../LoginForm/LoginForm";
import Auth from "../auth/Auth";
import { LoginContext } from "../Context/LoginContext/LoginContext";
import axios from "axios";
import SignUp from "../SignupForm/SignupForm";

const Todo = () => {
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const { data, dispatch } = useContext(ListContext);
  const { can } = useContext(LoginContext);

  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
    try {
      item.completed = false;
      const res = await axios.post(
        `https://hoehoehooo.onrender.com/todo`,
        item
      );
      console.log(res);

      dispatch({ type: "changeList", payload: item });
    } catch (err) {
      console.log("post", err);
    }
    console.log(item);
  }

  async function deleteItem(id) {
    try {
      await axios.delete(`https://hoehoehooo.onrender.com/todo/${id}`);
      const items = data.list.filter((item) => item.id !== id);
      dispatch({ type: "replaceList", payload: items });
    } catch (err) {
      console.log("delete error");
    }
  }

  async function toggleComplete(id) {
    if (can("update")) {
      const items = await Promise.all(
        data.list.map(async (item) => {
          if (item.id === id) {
            item.completed = !item.completed;
            try {
              item.id = id;
              const res = await axios.put(
                `https://hoehoehooo.onrender.com/todo/${id}`,
                item
              );
              console.log(res, "farat zaytoon aiooooth");
            } catch (err) {
              console.log("update error", err);
            }
          }
          return item;
        })
      );

      dispatch({ type: "replaceList", payload: items });
    }
  }
  async function getData() {
    try {
      const res = await axios.get("https://hoehoehooo.onrender.com/todo");
      dispatch({ type: "replaceList", payload: res.data.data });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    let incompleteCount = data.list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;

    // localStorage.setItem('list', JSON.stringify(data.list))
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.list]);

  return (
    <Flex direction="column" justify="center" align={"center"} mih="80vh">
      <SignUp />
      {/* <div className="grid-container"> */}
      <LoginForm />
      <Auth capability="read">
        <Title
          ta={"center"}
          c={"white"}
          bg="gray"
          w="80%"
          p={"20px"}
          m={"auto"}
          data-testid="todo-h1"
          order={1}
        >
          To Do List: {incomplete} items pending
        </Title>
        {/* </header > */}
      </Auth>
      <Grid
        mih={"80vh"}
        justify="center"
        w={"80%"}
        grow
        gutter={5}
        gutterXs="md"
        gutterMd="xl"
        gutterXl={50}
      >
        <Grid.Col span={6}>
          <Auth capability="create">
            <form onSubmit={handleSubmit}>
              <h2>Add To Do Item</h2>

              <TextInput
                onChange={handleChange}
                name="text"
                placeholder="Item Details"
                label="To Do Item"
                required
              />

              <TextInput
                onChange={handleChange}
                name="assignee"
                placeholder="Assignee Name"
                label="Assigned To"
                required
              />

              <Text>Difficulty</Text>
              <Slider
                color="#4CA3FF"
                onChange={handleChange}
                defaultValue={defaultValues.difficulty}
                step={1}
                min={1}
                max={5}
                name="difficulty"
              />
              <Button color="#4CA3FF" type="submit">
                Add Task
              </Button>
            </form>
          </Auth>
        </Grid.Col>
        <Grid.Col span={6}>
          <Auth capability="read">
            <List
              list={data.list}
              toggleComplete={toggleComplete}
              deleteItem={deleteItem}
            />
          </Auth>
       
        </Grid.Col>
      </Grid>
      {/* </div> */}
    </Flex>
  );
};

export default Todo;
