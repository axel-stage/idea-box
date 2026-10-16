INSERT INTO dev.user ( username, email )
VALUES
('Fred', 'fred@online.de'),
('Sandy', 'sandy@testmail.com'),
('Mike', 'likemike@xmail.me');

INSERT INTO dev.idea ( title, description, author_id )
VALUES
('Flexible Working Hours', 'Allow employees to adjust their start and finish times to improve work-life balance and productivity.', 1),
('Customer Feedback Surveys', 'Send a short survey after each purchase to identify areas for improvement and increase customer satisfaction.', 2),
('Paperless Office', 'Replace printed documents with digital forms and shared files to reduce costs and waste.', 3),
('Team Knowledge Sharing', 'Organize a monthly meeting where employees share useful skills, tips, and lessons learned.', 1),
('Customer Referral Program', 'Reward existing customers with discounts when they refer new customers to the business.', 1);

INSERT INTO dev.review ( author_id, idea_id, content, rating )
VALUES
(1, 1, 'Great idea! Flexible hours could improve employee satisfaction and productivity.', 5),
(2, 2, 'Useful suggestion. Customer feedback would help us identify areas for improvement.', 4),
(3, 3, 'A good way to reduce costs and support sustainability. Implementation may take some time.', 4),
(1, 4, 'Sharing knowledge across the team could improve collaboration and help everyone learn.', 5),
(2, 5, 'This could attract new customers, but we should define a clear and affordable reward system.', 4),
(1, 5, 'This is to much effort.', 1);
