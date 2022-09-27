import Svg from "../../../../svg";

const BarComponent = ({ list, price }) => {
  return (
    <div
      className="bar-component"
      style={{
        height: "10rem",
        display: "block",
        textAlign: "center",
        marginTop: "2rem",
        marginBottom: "2rem",
        marginRight: "1rem",
        marginLeft: "0",
        background: "#F4F3EE",
        borderRadius: "10px",
        paddingRight: "2rem",
      }}
    >
      {price === 1 ? <ul>&#8364; </ul> : <></>}
      {price === 2 ? <ul>&#8364; &#8364;</ul> : <></>}
      {price === 3 ? <ul>&#8364; &#8364; &#8364;</ul> : <></>}

      {list ? (
        list.map((item) => (
          <ul>
            <b>{item.bar}</b>
            <Svg style={{ marginLeft: "1rem" }} />
            {item.rating}
          </ul>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};
export default BarComponent;
