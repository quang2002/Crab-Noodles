import { GameConfig } from "../components/game-config.js";

export class StoryScene extends Phaser.Scene {
    static data = [{
        image: "images.story-01",
        text: "Năm 1971, nhà tiên tri của gia tộc JS đã phát hiện hành tinh Edgo có tồn tại sự sống."
    },
    {
        image: "images.story-02",
        text: "Những người sáng lập ra JS đã tạo ra AI mang tên Vũ Hải Lâm, sau đó gửi nó lên Edgo để xây dựng thế giới mới trên đó."
    },
    {
        image: "images.story-03",
        text: "50 năm sau, gia tộc JS đổi tên thành JS-Club, nhận được tín hiệu từ hành tinh Edgo và biết được về kế hoạch khi xưa."
    },
    {
        image: "images.story-04",
        text: "Ngay sau đó, thế hệ trẻ của JS-Club đã bắt đầu chiến dịch J-Chosen với mục đích khám phá thế giới mới trên Edgo."
    },
    {
        image: "images.story-04",
        text: "Chúc bạn may mắn!"
    },
    ];

    constructor() {
        super("StoryScene");
        this.state = 0;
    }

    static preload(scene) {
        scene.load.image("images.story-01", "./assets/images/story-01.png");
        scene.load.image("images.story-02", "./assets/images/story-02.png");
        scene.load.image("images.story-03", "./assets/images/story-03.png");
        scene.load.image("images.story-04", "./assets/images/story-04.png");
        scene.load.audio("sounds.story-theme", "./assets/sounds/theme/story-scene.mp3");
    }

    create() {
        //add theme sound
        this.themeSound = this.sound.add("sounds.story-theme", { volume: 0.5 });
        this.themeSound.play();

        this.image = this.add.image(this.scale.width / 2, this.scale.height / 2 - 200, "").setScale(1.5);
        this.text = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 100,
            "", {
            fontFamily: GameConfig["font-family"],
            fontSize: GameConfig["font-size"],
            wordWrap: {
                width: 1000
            }
        }
        ).setOrigin(0.5, 0);

        //print story 
        var idx = 0;
        this.time.addEvent({
            delay: 50,
            loop: true,
            callback: () => {
                if (this.state < StoryScene.data.length) {
                    if (idx < StoryScene.data[this.state].text.length) {
                        this.image.setTexture(StoryScene.data[this.state].image);
                        this.text.setText(this.text.text + StoryScene.data[this.state].text[idx++]);
                    }
                    // if enter space, continue to next story 
                    else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown) {
                        idx = 0;

                        this.text.setText("");

                        this.state++;
                    }
                } else {
                    this.themeSound.stop();
                    this.scene.start("ChoosePlayer");
                }
            }
        });
    }
}