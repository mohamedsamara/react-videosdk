import commonStyles from "../../../utils/commonStyles";

const Title = ({ title, dark }: { title: string; dark?: boolean }) => {
  return (
    <h2 style={{ color: dark ? commonStyles.primary : "#fff" }}>{title}</h2>
  );
};

export default Title;
