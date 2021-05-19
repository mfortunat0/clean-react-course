import { HttpPostParams } from "@/data/protocols/http/index";
import axios from "axios";

export class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios.post(params.url);
  }
}
