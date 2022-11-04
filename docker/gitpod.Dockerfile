# Based on https://www.gitpod.io/docs/configure/workspaces/workspace-image
FROM gitpod/workspace-node-lts:2022-10-30-18-48-35

RUN nvm install 18
RUN npx --yes playwright install-deps
