function getRandomAvatar(username) {
    // Construct the URL for the RoboHash API
    const baseUrl = 'https://robohash.org/';
    const size = '200x200'; // Adjust the size of the avatar as needed
    const format = 'png'; // You can also use other formats like 'jpg', 'jpeg', 'gif', etc.
    const hash = encodeURIComponent(username); // Use the email as input to generate a unique avatar
    const imageUrl = `${baseUrl}${hash}.${format}?size=${size}`;
    console.log("image url", imageUrl)
    return imageUrl;
  }

  export default getRandomAvatar;