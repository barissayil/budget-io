import prisma from "@db/prisma";
import { defineConfig } from "cypress";
import dayjs from "dayjs";

const email = "user@e2e.com";

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        async "db:seed:user"() {
          await prisma.user.deleteMany({ where: { email } });
          return prisma.user.create({
            data: {
              email,
            },
          });
        },
        async "db:seed:session"(sessionToken: string) {
          await prisma.session.deleteMany({
            where: { sessionToken },
          });
          return prisma.session.create({
            data: {
              user: { connect: { email } },
              expires: dayjs().add(1, "year").toDate(),
              sessionToken,
            },
          });
        },
      });
    },
  },
});
