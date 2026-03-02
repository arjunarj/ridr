const { withAndroidManifest, withDangerousMod } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

function withCallDetection(config) {
  config = withAndroidManifest(config, (cfg) => {
    const main = cfg.modResults;
    const app = main.manifest.application?.[0] ?? {};

    const perms = [
      "android.permission.READ_PHONE_STATE",
      "android.permission.READ_CONTACTS",
      "android.permission.ANSWER_PHONE_CALLS",
      "android.permission.MODIFY_AUDIO_SETTINGS",
    ];
    const manifestPerms = main.manifest["uses-permission"] ?? [];
    for (const p of perms) {
      if (!manifestPerms.some((x) => x.$?.["android:name"] === p)) {
        manifestPerms.push({ $: { "android:name": p } });
      }
    }
    main.manifest["uses-permission"] = manifestPerms;

    const receivers = app.receiver ?? [];
    if (
      !receivers.some((r) => r.$?.["android:name"] === ".CallDetectionReceiver")
    ) {
      receivers.push({
        $: {
          "android:name": ".CallDetectionReceiver",
          "android:exported": "true",
        },
        "intent-filter": [
          {
            action: [
              {
                $: {
                  "android:name": "android.intent.action.PHONE_STATE",
                },
              },
            ],
          },
        ],
      });
      app.receiver = receivers;
    }
    return cfg;
  });

  config = withDangerousMod(config, [
    "android",
    async (cfg) => {
      const root = cfg.modRequest.projectRoot;
      const androidPath = path.join(root, "android");
      if (!fs.existsSync(androidPath)) return cfg;

      const pkgDir = path.join(
        androidPath,
        "app",
        "src",
        "main",
        "java",
        "com",
        "ridr",
        "app"
      );
      fs.mkdirSync(pkgDir, { recursive: true });

      const receiverJava = `package com.ridr.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.telephony.TelephonyManager;

public class CallDetectionReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (!"android.intent.action.PHONE_STATE".equals(intent.getAction())) return;
        String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);
        if (!TelephonyManager.EXTRA_STATE_RINGING.equals(state)) return;

        String number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);
        if (number == null) number = "";

        Intent open = new Intent(Intent.ACTION_VIEW, Uri.parse("ridr://incoming?number=" + Uri.encode(number)));
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
        open.setPackage(context.getPackageName());
        context.startActivity(open);
    }
}
`;
      fs.writeFileSync(
        path.join(pkgDir, "CallDetectionReceiver.java"),
        receiverJava
      );
      return cfg;
    },
  ]);

  return config;
}

module.exports = withCallDetection;
