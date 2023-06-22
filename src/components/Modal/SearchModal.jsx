import React, { useState } from "react";
import { SearchItem, SearchModalWrapper } from "./modal.styles";
import { PreviewModal } from "./PreviewModal";
import { findRefArticles } from "../../actions";

export const SearchModal = (props) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState({
    id: -1,
    open: false,
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      getData(e.target.value);
    }, 1000);
  };

  const handlePreview = (id) => {
    setPreview({ id: id, open: true });
  };

  const getData = async (value) => {
    setLoading(true);
    const res = await findRefArticles(value);

    setLoading(false);
    if (res.success) {
      setData(res.data);
    } else {
      toast.error("Database Connection Error!");
    }
  };
  return (
    <>
      <PreviewModal
        {...preview}
        onClose={() => setPreview({ title: "", content: "", open: false })}
      />
      <SearchModalWrapper {...props}>
        <h1>Buma</h1>
        <input
          type="text"
          value={search}
          placeholder="Search for a topic which you want to insert to the post"
          onChange={handleChange}
        />
        {loading
          ? "Loading ..."
          : data.map((item, key) => (
              <SearchItem key={key}>
                <h1 onClick={() => handlePreview(item.id)}>{item.title}</h1>
                <p>{item.plainText}</p>
              </SearchItem>
            ))}
      </SearchModalWrapper>
    </>
  );
};
