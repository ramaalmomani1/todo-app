import React, { useContext, useState } from "react";
import { Card, Text, Badge, Button, Flex, Pagination } from "@mantine/core";
import { SettingContext } from "../Context/Settings/Settings";
import Auth from "../auth/Auth";

export default function List({ list, toggleComplete, deleteItem }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { settings } = useContext(SettingContext);

  let toRenderList = settings.showDone
    ? list
    : list.filter((task) => !task.completed);

  let startIndex = settings.taskPerPage * (currentPage - 1);
  let endIndex = startIndex + settings.taskPerPage;
  let currentPageRender = toRenderList
    ? toRenderList.slice(startIndex, endIndex)
    : [];
  let PaginationPages = Math.ceil(toRenderList.length / settings.taskPerPage);

  return (
    <div>
      <Pagination
        onChange={setCurrentPage}
        m="20px"
        color="#4CA3FF"
        total={PaginationPages}
      />
      {currentPageRender.map((item) => (
        <Card
          data-testid="task-card"
          m="10px"
          p="20px"
          key={item.id}
          shadow="xs"
          radius="sm"
          style={{
            background: "#F5F5F5",
            border: "1px solid #E0E0E0", 
            marginBottom: "20px", 
          }}
        >
          <Card.Section>
            <Flex
              justify="space-between"
              align="center"
            >
              <Text size="lg" weight={700}>
                Task: {item.text}
              </Text>
              <Text>Assigned to: {item.assignee}</Text>
              <Flex gap="xs" align="center">
                <Badge
                  data-testid="btn-done"
                  color={item.completed ? "green" : "red"}
                  onClick={() => toggleComplete(item.id)}
                >
                  {item.completed ? "Completed" : "Pending"}
                </Badge>
               
                <Text>Difficulty: {item.difficulty}</Text>
                <Auth capability="delete">
                  <Button
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                    color="#4CA3FF"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </Auth>
              </Flex>
            </Flex>
          </Card.Section>
        </Card>
      ))}
    </div>
  );
}
