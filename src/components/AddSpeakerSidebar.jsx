"use client";
import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  Checkbox,
  Button,
  Card,
  CardContent,
  Box,
  Input,
  TextField,
} from "@mui/material";
import { LiaEdit } from "react-icons/lia";
import { IoIosSearch, IoIosClose } from "react-icons/io";
import { CiUser } from "react-icons/ci";

const initialSpeakersData = [
  {
    id: 1,
    name: "Eleanor Pena",
    title: "President of Sales",
    organization: "XYZ Organisation",
  },
  {
    id: 2,
    name: "Esther Howard",
    title: "Marketing Coordinator",
    organization: "XYZ Organisation",
  },
  {
    id: 3,
    name: "Albert Flores",
    title: "Nursing Assistant",
    organization: "XYZ Organisation",
  },
  {
    id: 4,
    name: "John Doe",
    title: "Marketing Head",
    organization: "XYZ Organisation",
  },
  {
    id: 5,
    name: "Savannah Nguyen",
    title: "Web Designer",
    organization: "XYZ Organisation",
  },
];

export default function AddSpeakerSidebar() {
  const [open, setOpen] = useState(false);
  const [selectedSpeakers, setSelectedSpeakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [speakersData, setSpeakersData] = useState(initialSpeakersData);
  const [editSpeaker, setEditSpeaker] = useState(null);
  const [newSpeaker, setNewSpeaker] = useState({
    name: "",
    title: "",
    organization: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
    setIsCreating(false);
  };

  const handleSpeakerSelect = (speakerId) => {
    setSelectedSpeakers((prevSelected) =>
      prevSelected.includes(speakerId)
        ? prevSelected.filter((id) => id !== speakerId)
        : [...prevSelected, speakerId]
    );
  };

  const filteredSpeakers = speakersData.filter((speaker) =>
    speaker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (speaker) => {
    setEditSpeaker(speaker);
    setIsCreating(false);
  };

  const handleSaveEdit = () => {
    setSpeakersData((prevSpeakers) =>
      prevSpeakers.map((speaker) =>
        speaker.id === editSpeaker.id ? editSpeaker : speaker
      )
    );
    setEditSpeaker(null);
  };

  const handleCreateSpeaker = () => {
    if (newSpeaker.name && newSpeaker.title && newSpeaker.organization) {
      setSpeakersData((prevSpeakers) => [
        ...prevSpeakers,
        { id: Date.now(), ...newSpeaker },
      ]);
      setNewSpeaker({ name: "", title: "", organization: "" });
      setIsCreating(false);
    } else {
      console.error("Please fill in all fields");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSpeaker((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {!open ? (
        <>
          <h2 className="py-4 mx-1">Add Speaker</h2>{" "}
          <button
            className="px-2 py-2 rounded-lg bg-orange-500 text-white"
            onClick={toggleDrawer}
          >
            Add Speaker
          </button>
        </>
      ) : (
        <div></div>
      )}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div className="md:w-[500px]  h-full flex flex-col">
          <div className="bg-gray-100 flex justify-between p-4">
            <h3 className="font-medium">
              {isCreating ? "Create Speaker" : "Add Speaker"}
            </h3>
            <IoIosClose
              size={25}
              className="cursor-pointer"
              onClick={toggleDrawer}
            />
          </div>

          {isCreating ? (
            <div className="p-4">
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                margin="normal"
                name="name"
                value={newSpeaker.name}
                onChange={handleChange}
              />
              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                margin="normal"
                name="title"
                value={newSpeaker.title}
                onChange={handleChange}
              />
              <TextField
                label="Organization"
                fullWidth
                variant="outlined"
                margin="normal"
                name="organization"
                value={newSpeaker.organization}
                onChange={handleChange}
              />
              <button
                className="rounded-xl mt-4 bg-orange-500 p-2 text-white"
                onClick={handleCreateSpeaker}
              >
                Save Speaker
              </button>
            </div>
          ) : editSpeaker ? (
            <div className="p-4">
              <Button
                className="mb-4"
                onClick={() => setEditSpeaker(null)}
                color="warning"
              >
                Go Back
              </Button>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                margin="normal"
                value={editSpeaker.name}
                onChange={(e) =>
                  setEditSpeaker((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                margin="normal"
                value={editSpeaker.title}
                onChange={(e) =>
                  setEditSpeaker((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <TextField
                label="Organization"
                fullWidth
                variant="outlined"
                margin="normal"
                value={editSpeaker.organization}
                onChange={(e) =>
                  setEditSpeaker((prev) => ({
                    ...prev,
                    organization: e.target.value,
                  }))
                }
              />
              <Button
                variant="contained"
                color="warning"
                onClick={handleSaveEdit}
                className="mt-4"
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              <div className="relative m-4">
                <IoIosSearch
                  size={18}
                  className="text-orange-400 absolute top-3 left-3"
                />
                <Input
                  className="w-full border-2 pl-10 py-1 rounded-lg"
                  type="search"
                  disableUnderline
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="overflow-y-auto p-4 flex-grow">
                {filteredSpeakers.length == 0 ? (
                  <div>No Speaker found create a new one....</div>
                ) : (
                  filteredSpeakers.map((speaker) => (
                    <Card
                      key={speaker.id}
                      variant="outlined"
                      className={`relative border border-gray-300 rounded-lg mb-4
                    ${
                      selectedSpeakers.includes(speaker.id)
                        ? "border-green-500"
                        : "bg-white"
                    }`}
                    >
                      <CardContent>
                        <Box className="flex items-center">
                          <Box className="bg-gray-300 rounded-full p-2 mr-4">
                            <CiUser className="text-gray-500" size={25} />
                          </Box>
                          <div>
                            <div className="font-medium text-lg">
                              {speaker.name}
                            </div>
                            <p className="text-gray-500 text-sm truncate">
                              {speaker.title} | {speaker.organization}
                            </p>
                          </div>
                        </Box>
                      </CardContent>
                      <Box className="md:mx-[14%] mx-[17%] -mt-[4%]">
                        <IconButton
                          className="text-orange-400"
                          onClick={() => handleEditClick(speaker)}
                        >
                          <LiaEdit />
                          <div className="text-sm font-medium">
                            Edit Speaker
                          </div>
                        </IconButton>
                        <Checkbox
                        className="absolute top-2 right-2"
                        checked={selectedSpeakers.includes(speaker.id)}
                        onChange={() => handleSpeakerSelect(speaker.id)}
                        sx={{
                          "&.Mui-checked": {
                            color: "green",
                          },
                        }}
                      />
                      </Box>
                      
                    </Card>
                  ))
                )}
              </div>

              <div className="flex justify-between p-4">
                <div className="flex">
                  <Button
                    variant="contained"
                    color="warning"
                    disabled={selectedSpeakers.length === 0}
                  >
                    Add
                  </Button>
                  <button
                    className="bg-orange-500 text-white mx-4 p-2 rounded-lg"
                    onClick={toggleDrawer}
                  >
                    Cancel
                  </button>
                </div>
                <button
                 
                  className="mx-4 text-orange-500"
                  onClick={() => {
                    setIsCreating(true);
                    setEditSpeaker(null);
                  }}
                >
                  Create a Speaker
                </button>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}
