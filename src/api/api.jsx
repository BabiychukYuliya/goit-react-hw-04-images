import axios from "axios";

export async function fetchQuery(imageName, page = 1) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=32824197-fdf9de1b54cd092b4fe49e40b&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}