const dotenv = require("dotenv");
dotenv.config();
const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const schedule = require("node-schedule");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

function createEmbed(name1, name2, name3) {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const member1 = guild.members.cache.get(name1);
  const member2 = guild.members.cache.get(name2);
  const member3 = guild.members.cache.get(name3);

  const username1 = member1.user.username;
  const username2 = member2.user.username;
  const username3 = member3.user.username;
  const displayName1 = member1.displayName;
  const displayName2 = member2.displayName;
  const displayName3 = member3.displayName;

  const embedMessage = {
    embeds: [
      {
        title: "🎉 本日の日替わりメンバー 🎉",
        description:
          "おめでとうございます！今日の幸運なメンバーが決定しました！",
        color: 0xffd700,
        fields: [
          {
            name: "🥇 1人目",
            value: `**${displayName1}** (${username1})`,
            inline: true,
          },
          {
            name: "🥈 2人目",
            value: `**${displayName2}** (${username2})`,
            inline: true,
          },
          {
            name: "🥉 ３人目",
            value: `**${displayName3}** (${username3})`,
            inline: true,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: "毎日抽選 | created by @kozaku05",
          icon_url: client.user.displayAvatarURL(),
        },
      },
    ],
  };
  return embedMessage;
}

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
});
async function deleteRole() {
  let data = fs.readFileSync("roleDB.json", "utf8");
  const guild = await client.guilds.cache.get(process.env.GUILD_ID);
  const role = await guild.roles.cache.get(process.env.ROLE_ID);
  if (data === "") return;
  let id_list = JSON.parse(data);
  id_list.forEach((id) => {
    const member = guild.members.cache.get(id);
    if (member) {
      member.roles.remove(role);
    }
  });
  fs.writeFileSync("roleDB.json", JSON.stringify([]));
}
async function addRole() {
  const guild = await client.guilds.cache.get(process.env.GUILD_ID);
  const role = await guild.roles.cache.get(process.env.ROLE_ID);
  let AllMember = await guild.members.fetch();
  let id_list = [];
  AllMember.forEach((member) => {
    if (member.user.bot) return;
    id_list.push(member.id);
  });
  let ramdom_id = [];
  for (let i = 0; i < 3; i++) {
    let id = id_list[Math.floor(Math.random() * id_list.length)];
    if (ramdom_id.includes(id)) i--;
    ramdom_id.push(id);
  }
  ramdom_id.forEach((id) => {
    const member = guild.members.cache.get(id);
    console.log(`ロールを追加: ${member.user.username} (${id})`);
    member.roles.add(role);
  });
  fs.writeFileSync("roleDB.json", JSON.stringify(ramdom_id));
}
async function main() {
  await deleteRole();
  await addRole();
  let user_list = JSON.parse(fs.readFileSync("roleDB.json", "utf8"));
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const embed = createEmbed(user_list[0], user_list[1], user_list[2]);
  const channel = await guild.channels.cache.get(process.env.CHANNEL_ID);
  channel.send(embed);
  const higawari_channel = await guild.channels.cache.get(
    process.env.HIGAWARI_ID
  );
  let user1 = user_list[0];
  let user2 = user_list[1];
  let user3 = user_list[2];
  higawari_channel.send(`<@${user1}>, <@${user2}>, <@${user3}>`);
}
client.login(process.env.TOKEN);
schedule.scheduleJob("0 0 * * *", main);
