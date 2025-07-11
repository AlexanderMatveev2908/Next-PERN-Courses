import { isStr } from "@shared/first/lib/dataStructure.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { schemaPostCourseServer } from "../paperwork/postCourse.js";
import { __cg } from "@shared/first/lib/logger.js";
import fs from "fs";
import { boolObj, grabErrMsgZOD } from "@shared/first/lib/etc.js";
import { grabFilesByMime } from "@src/lib/etc.js";

export const checkPostCourse = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  const { myFormData } = req;

  if (!myFormData) return res.res422({ msg: "missing form at all" });

  const { fields, files } = myFormData;

  const normalized = {
    ...fields,
    rootLanguage: boolObj[fields.rootLanguage as keyof typeof boolObj],
    ...grabFilesByMime(files),
  };

  const result = schemaPostCourseServer.safeParse(normalized);

  if (result.error) {
    const { fancyErrsList, msg } = grabErrMsgZOD(result);

    if (isStr(normalized.videoFile?.path))
      try {
        await fs.promises.unlink(normalized!.videoFile!.path!);

        __cg("success local delete");
      } catch (err) {
        __cg("fail local delete");
      }

    return res.res422({ msg, fancyErrsList });
  } else if (result.success) {
    __cg("success form");
  }
};
