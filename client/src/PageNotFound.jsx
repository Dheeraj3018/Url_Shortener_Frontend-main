export function PageNotFound() {
  return (
    <div className="not-found">
      <img
        className="not-found-img"
        src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/507f015a7efd81cec270faf9c4f1aabd.gif"
        alt="Page Not Found"
      />
      <p className="not-fount-text">{`Page Not found, please check and find the correct URL`}</p>
    </div>
  );
}
