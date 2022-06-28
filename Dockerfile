# Install dependencies only when needed
FROM 145747431880.dkr.ecr.us-west-1.amazonaws.com/node:14.15.4-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn

# Rebuild the source code only when needed
FROM 145747431880.dkr.ecr.us-west-1.amazonaws.com/node:14.15.4-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

# Production image, copy all the files and run next
FROM 145747431880.dkr.ecr.us-west-1.amazonaws.com/node:14.15.4-alpine AS runner
WORKDIR /app

COPY --from=builder /app .

RUN rm -rf helm .git* aws-iam-authenticator kubectl linux-amd64
RUN addgroup --gid 1001 --system nodejs
RUN adduser --system nextjs -u 1001
RUN chown -R nextjs:nodejs /app/build
USER nextjs

CMD ["yarn", "deploy"]