# Based on https://www.gitpod.io/docs/configure/workspaces/workspace-image
FROM gitpod/workspace-full:2022-10-30-18-48-35

RUN npx --yes playwright
