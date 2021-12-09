const NotFoundScreen = ({ message }: { message: string }) => {
  return (
    <div className="center">
      <p className="h1-title">{message}</p>
    </div>
  );
};

export default NotFoundScreen;
