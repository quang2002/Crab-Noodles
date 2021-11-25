import { GameConfig } from "../components/game-config.js";

export class StoryScene extends Phaser.Scene {
    static data = [{
            image: "images.story-01",
            text: "Năm 2041, thế giới ngày càng phát triển, con người đã tạo ra những công nghệ có thể du hành đến bất kỳ đâu trong vũ trụ."
        },
        {
            image: "images.story-02",
            text: "Ngày 11/3/2042, cuộc thử nghiệm đầu tiên diễn ra, các nhà phát minh đến hành tinh Titan nơi có tồn tại sự sống, nhưng sau đó không nhận lại được tín hiệu báo về."
        },
        {
            image: "images.story-02",
            text: "Người đồng phát triển dự án đã yêu cầu đóng cánh cổng lại để tránh nguy hiểm cho mọi người."
        },
        {
            image: "images.story-03",
            text: "Nhưng đã quá muộn khi một sinh vật đã chui qua cánh cổng đến trái đất và phá hủy chiếc máy khiến cho không thể đóng được cổng."
        },
        {
            image: "images.story-03",
            text: "Tuy nhiên, quá trình trở về đã xảy ra sự cố, cỗ máy đã đưa mọi người về ngày 11/8/2042 ngoại trừ bạn dịch chuyển về đúng ngày xảy ra sự kiện."
        },
        {
            image: "images.story-04",
            text: "Do đó nhiệm vụ của bạn là dừng hoạt động của cổng không gian. Chúc bạn may mắn!"
        }
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
    }

    create() {
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
                    console.log("Next Scene");
                }
            }
        });
    }
}