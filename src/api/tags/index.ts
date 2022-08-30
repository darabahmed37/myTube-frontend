import { getRequest } from "api/axios";
import { TagsRoutes } from "api/tags/routes";

export function getAllTags() {
	return getRequest(TagsRoutes.TAGS);
}
