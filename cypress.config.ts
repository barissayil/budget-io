import prisma from "@db/prisma";
import { defineConfig } from "cypress";
import dayjs from "dayjs";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        async "db:seed:user"() {
          await prisma.user.deleteMany({ where: { email: "user@e2e.com" } });
          return prisma.user.create({
            data: {
              email: "user@e2e.com",
            },
          });
        },
        async "db:seed:session"(sessionToken: string) {
          await prisma.session.deleteMany({
            where: { sessionToken },
          });
          return prisma.session.create({
            data: {
              user: { connect: { email: "user@e2e.com" } },
              expires: dayjs().add(1, "year").toDate(),
              sessionToken,
            },
          });
        },
      });
    },
  },
});
